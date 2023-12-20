import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  IPolicyValidationPluginBeta1,
  IPolicyValidationContextBeta1,
  PolicyViolationBeta1,
  PolicyValidationPluginReportBeta1,
} from 'aws-cdk-lib';
import { ScanState, Severity, WizScan } from './scan';
import { exec } from './utils';

export interface WizValidatorProps {
  /**
   * The severity level to report on.
   * Any violations with a severity lower than this level will not be reported.
   *
   * @default - Severity.MEDIUM
   */
  reportOnSeverity?: Severity;

  /**
   * The severity level to fail on.
   * Any violations with a severity >= this level will cause the validation to fail.
   *
   * The failure severity configured in wiz will always take precedence, but this
   * can be used to fail on a lower severity than the default.
   *
   * @default - the default configured in wiz (probably Severity.CRITICAL)
   */
  failOnSeverity?: Severity;
}

export class WizValidator implements IPolicyValidationPluginBeta1 {
  public readonly ruleIds?: string[] | undefined;
  public readonly name: string;
  public readonly version?: string | undefined;
  private readonly wiz: string;
  private readonly tmpDir: string;
  private readonly reportSeverities: Severity[];
  private readonly failSeverities?: Severity[];

  constructor(props?: WizValidatorProps) {
    this.name = 'cdk-validator-wiz';
    const osPlatform = os.platform();
    const osArch = os.arch();
    this.tmpDir = fs.realpathSync(os.tmpdir());

    if (!['linux', 'darwin'].includes(osPlatform)) {
      throw new Error(`${osPlatform} not supported, must be either 'darwin' or 'linux'`);
    }

    let arch = '';
    switch (osArch) {
      case 'x64':
        arch = 'amd64';
        break;
      case 'arm64':
        arch = 'arm64';
        break;
    }

    if (!arch) {
      throw new Error(`${osArch} not supported, must be either 'arm64' or x86_64`);
    }

    this.wiz = path.join(__dirname, '..', 'bin', osPlatform, osArch, 'wizcli');

    const reportOnSeverity = props?.reportOnSeverity ?? Severity.MEDIUM;
    switch (reportOnSeverity) {
      case Severity.CRITICAL:
        this.reportSeverities = [Severity.CRITICAL];
        break;
      case Severity.HIGH:
        this.reportSeverities = [Severity.CRITICAL, Severity.HIGH];
        break;
      case Severity.MEDIUM:
        this.reportSeverities = [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM];
        break;
      case Severity.LOW:
        this.reportSeverities = [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW];
        break;
      case Severity.INFO:
        this.reportSeverities = [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW, Severity.INFO];
        break;
      default:
        throw new Error(`Unknown severity ${reportOnSeverity}`);
    }

    if (props?.failOnSeverity) {
      switch (props.failOnSeverity) {
        case Severity.CRITICAL:
          this.failSeverities = [Severity.CRITICAL];
          break;
        case Severity.HIGH:
          this.failSeverities = [Severity.CRITICAL, Severity.HIGH];
          break;
        case Severity.MEDIUM:
          this.failSeverities = [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM];
          break;
        case Severity.LOW:
          this.failSeverities = [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW];
          break;
        case Severity.INFO:
          this.failSeverities = [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW, Severity.INFO];
          break;
        default:
          throw new Error(`Unknown severity ${props.failOnSeverity}`);
      }
    }
  }

  validate(context: IPolicyValidationContextBeta1): PolicyValidationPluginReportBeta1 {
    return this.execWiz(context.templatePaths);
  }

  private execWiz(templatePaths: string[]): Pick<PolicyValidationPluginReportBeta1, 'success' | 'violations' | 'metadata'> {
    const outFile = path.join(this.tmpDir, 'wiz.json');
    const flags = [
      'iac', 'scan',
      '--output', `${outFile},json,false,default`,
      '--format', 'json',
      ...templatePaths.flatMap(template => ['--path', template]),
      '--expand-cloudformation-intrinsics',
      '--types', 'Cloudformation',
    ];
    const violations: PolicyViolationBeta1[] = [];
    const metadata: { [key: string]: string } = {};
    let success: boolean = true;
    try {
      exec([this.wiz, ...flags]);
      const result = fs.readFileSync(outFile);

      const wizResults: WizScan = JSON.parse(result.toString());
      if (wizResults.status.state === ScanState.FAILED) {
        success = false;
      }
      metadata.reportUrl = wizResults.reportUrl;
      metadata.scanState = wizResults.status.state;
      metadata.scanVerdict = wizResults.status.verdict;
      metadata.filesFound = wizResults.result.scanStatistics.filesFound.toString();
      metadata.lowMatches = wizResults.result.scanStatistics.lowMatches.toString();
      metadata.filesParsed = wizResults.result.scanStatistics.filesParsed.toString();
      metadata.highMatches = wizResults.result.scanStatistics.highMatches.toString();
      metadata.infoMatches = wizResults.result.scanStatistics.infoMatches.toString();
      metadata.mediumMatches = wizResults.result.scanStatistics.mediumMatches.toString();
      metadata.criticalMatches = wizResults.result.scanStatistics.criticalMatches.toString();
      metadata.queriesExecuted = wizResults.result.scanStatistics.queriesExecuted.toString();
      wizResults.result.ruleMatches.forEach(match => {
        if (!shouldReport(match.severity, this.reportSeverities)) {
          return;
        }
        if (shouldFail(match.severity, this.failSeverities) || match.failedResourceCount > 0) {
          success = false;
        }
        violations.push({
          violatingResources: match.matches.flatMap(m => {
            return {
              locations: [`${m.lineNumber}`],
              resourceLogicalId: m.resourceName.split('.')[1],
              templatePath: m.filename,
            };
          }),
          severity: match.severity,
          description: match.rule.name,
          ruleName: match.rule.name,
          ruleMetadata: {
            ruleId: match.rule.id,
          },
        });
      });
    } catch (e) {
      success = false;
      throw new Error(`
        CfnGuardValidator plugin failed processing cfn-guard results.
        Please create an issue https://github.com/cdklabs/cdk-validator-cfnguard/issues/new
        Error: ${e}`);
    }
    return {
      success,
      violations,
      metadata,
    };
  }
}

function shouldReport(severity: Severity, reportSeverities: Severity[]): boolean {
  return reportSeverities.includes(severity);
}

function shouldFail(severity: Severity, failSeverities?: Severity[]): boolean {
  if (!failSeverities) {
    return false;
  }
  return failSeverities.includes(severity);
}

