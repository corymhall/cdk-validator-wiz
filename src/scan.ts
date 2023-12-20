
export interface WizScan {
  id: string;
  status: ScanStatus;
  policies: Policy[];
  reportUrl: string;
  result: Result;
}

export interface ScanStatus {
  state: ScanState;
  verdict: ScanVerdict;
}

export enum ScanState {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum ScanVerdict {
  PASSED_BY_POLICY = 'PASSED_BY_POLICY',
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  type: string; // TODO enum
  builtin: boolean;
  policyLifecycleEnforcements: Enforcements[];
  params: PolicyParams;
}

export interface PolicyParams {
  severityThreshold: Severity;
  countThreshold: number;
  ignoredRules: any; // TODO: figure this out
  validatableIgnoredRules: any; // TODO: figure this out
  builtinIgnoreTagsEnabled: boolean;
  customIgnoreTags: any; // TODO: figure this out
  securityFrameworks: any; // TODO: figure this out
}

export interface Enforcements {
  enforcementMethod: EnforcementMethod;
  deploymentLifecycle: DeploymentLifecycle;
}

export enum DeploymentLifecycle {
  ADMISSION_CONTROLLER = 'ADMISSION_CONTROLLER',
  CLI = 'CLI',
}

export enum EnforcementMethod {
  AUDIT = 'AUDIT',
  BLOCK = 'BLOCK',
}

export interface Result {
  failedPolicyMatches: any[]; // TODO: not sure what this type is yet. Don't have any Critical policies
  ruleMatches: Match[];
  scanStatistics: ScanStatistics;
}

interface ScanStatistics {
  infoMatches: number;
  lowMatches: number;
  mediumMatches: number;
  highMatches: number;
  criticalMatches: number;
  filesFound: number;
  filesParsed: number;
  queriesLoaded: number;
  queriesExecuted: number;
  queriesExecutedFailed: number;
}

export enum Severity {
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  INFO = 'INFO',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Match {
  rule: MatchRule;
  severity: Severity;
  failedResourceCount: number;
  failedPolicyMatches: Match[];
  matches: RuleMatch[];
}

export interface MatchRule {
  id: string;
  name: string;
}

export interface RuleMatch {
  failedPolicies: any[]; // TODO: not sure what this type is yet. Don't have any Critical policies
  resourceName: string;
  filename: string;
  lineNumber: number;
  expected: string;
  found: string;
}
