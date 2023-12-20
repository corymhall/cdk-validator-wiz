import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import mock from 'mock-fs';
import { WizValidator } from '../src/plugin';
import { Result, ScanState, ScanVerdict, Severity, WizScan } from '../src/scan';
import * as utils from '../src/utils';

const tmpDir = fs.realpathSync(os.tmpdir());

jest.mock('../src/utils', () => ({
  __esModule: true,
  ...jest.requireActual('../src/utils'),
}));
const wizScanResult: Omit<Result, 'ruleMatches'> = {
  failedPolicyMatches: [],
  scanStatistics: {
    criticalMatches: 0,
    filesFound: 1,
    filesParsed: 1,
    highMatches: 2,
    infoMatches: 1,
    lowMatches: 1,
    mediumMatches: 1,
    queriesExecuted: 10,
    queriesExecutedFailed: 0,
    queriesLoaded: 10,
  },
};
const wizResults: Omit<WizScan, 'result'> = {
  id: 'abcd',
  policies: [],
  reportUrl: 'http://report.com',
  status: {
    state: ScanState.SUCCESS,
    verdict: ScanVerdict.PASSED_BY_POLICY,
  },
};
let execMock = jest.spyOn(utils, 'exec').mockImplementation(() => {});
jest.spyOn(os, 'tmpdir').mockImplementation(() => { return '/abc'; });
describe('WizValidator', () => {
  beforeEach(() => {
    mock({
      [path.join(tmpDir)]: {
        'wiz.json': JSON.stringify({
          ...wizResults,
          result: {
            ...wizScanResult,
            ruleMatches: [],
          },
        }),
      },
      '/var': mock.symlink({
        path: '/private/var',
      }),
    }, { createTmp: false, createCwd: false });
  });
  afterEach(() => {
    mock.restore();
  });

  test('wizcli called', () => {
    // GIVEN
    const plugin = new WizValidator();

    // WHEN
    plugin.validate({
      templatePaths: ['template-path-1', 'template-path-2'],
    });

    // THEN
    expect(execMock).toHaveBeenCalledTimes(1);
    expect(execMock).toHaveBeenNthCalledWith(1, expect.arrayContaining([
      expect.stringMatching(/.*bin\/\w+\/\w+\/wizcli$/),
      'iac', 'scan',
      '--output', `${path.join(tmpDir, 'wiz.json')},json,false,default`,
      '--format', 'json',
      '--path',
      'template-path-1',
      '--path',
      'template-path-2',
      '--expand-cloudformation-intrinsics',
      '--types', 'Cloudformation',
    ]));
  });

  test('Results metadata populated', () => {
    // GIVEN
    const plugin = new WizValidator();

    // WHEN
    const res = plugin.validate({
      templatePaths: ['template-path-1', 'template-path-2'],
    });

    // THEN
    expect(res.success).toEqual(true);
    expect(res.violations).toEqual([]);
    expect(res.metadata).toEqual({
      reportUrl: 'http://report.com',
      scanState: 'SUCCESS',
      scanVerdict: 'PASSED_BY_POLICY',
      criticalMatches: '0',
      filesFound: '1',
      filesParsed: '1',
      highMatches: '2',
      infoMatches: '1',
      lowMatches: '1',
      mediumMatches: '1',
      queriesExecuted: '10',
    });
  });

  test('Rule failed', () => {
    // GIVEN
    mock({
      [path.join(tmpDir)]: {
        'wiz.json': JSON.stringify({
          ...wizResults,
          result: {
            ...wizScanResult,
            ruleMatches: [
              {
                rule: {
                  id: 'e6619a6a-2e36-471f-af42-081e9ad5eaee',
                  name: "S3 Bucket 'Block Public Access' settings should block the creation of new public ACLs",
                },
                severity: Severity.HIGH,
                failedResourceCount: 1,
                failedPolicyMatches: [],
                matches: [{
                  expected: "'PublicAccessBlockConfiguration' should be defined%!(EXTRA string=MyBucket)",
                  failedPolicies: [],
                  filename: 'cdk.out/template-path-1',
                  found: "'PublicAccessBlockConfiguration' is not defined%!(EXTRA string=MyBucket)",
                  lineNumber: 5,
                  resourceName: 'Resources.MyBucket.Properties',
                }],
              },
            ],
          },
        }),
      },
      '/var': mock.symlink({
        path: '/private/var',
      }),
    }, { createTmp: false, createCwd: false });
    const plugin = new WizValidator();

    // WHEN
    const res = plugin.validate({
      templatePaths: ['template-path-1', 'template-path-2'],
    });

    // THEN
    expect(res.success).toEqual(false);
    expect(res.violations).toEqual([{
      severity: 'HIGH',
      description: "S3 Bucket 'Block Public Access' settings should block the creation of new public ACLs",
      ruleName: "S3 Bucket 'Block Public Access' settings should block the creation of new public ACLs",
      ruleMetadata: {
        ruleId: 'e6619a6a-2e36-471f-af42-081e9ad5eaee',
      },
      violatingResources: [{
        locations: ['5'],
        resourceLogicalId: 'MyBucket',
        templatePath: 'cdk.out/template-path-1',
      }],
    }]);
    expect(res.metadata).toEqual({
      reportUrl: 'http://report.com',
      scanState: 'SUCCESS',
      scanVerdict: 'PASSED_BY_POLICY',
      criticalMatches: '0',
      filesFound: '1',
      filesParsed: '1',
      highMatches: '2',
      infoMatches: '1',
      lowMatches: '1',
      mediumMatches: '1',
      queriesExecuted: '10',
    });
  });
});
