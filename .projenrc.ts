import { JsonPatch, ReleasableCommits, cdk } from 'projen';
import { Transform } from 'projen/lib/javascript';
const project = new cdk.JsiiProject({
  author: 'corymhall',
  authorAddress: '43035978+corymhall@users.noreply.github.com',
  defaultReleaseBranch: 'main',
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  releaseToNpm: false,
  jsiiVersion: '~5.3.0',
  name: 'cdk-validator-wiz',
  githubOptions: {
    mergify: false,
  },
  projenrcTs: true,
  repositoryUrl: 'https://github.com/corymhall/cdk-validator-wiz.git',
  devDeps: [
    'aws-cdk-lib@^2.76.0',
    'jsii@^5.0.0',
    'jsii-rosetta@^5.0.0',
    'mock-fs',
    '@types/mock-fs',
    '@swc/core',
    '@swc/jest',
  ],

  peerDeps: [
    'aws-cdk-lib@^2.76.0',
  ],
  jestOptions: {
    configFilePath: 'jest.config.json',
  },
  publishToGo: {
    moduleName: 'github.com/corymhall/cdk-validator-wiz',
    gitBranch: 'go',
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

const jestConfig = project.tryFindObjectFile('jest.config.json');
jestConfig?.patch(JsonPatch.remove('/preset'));
jestConfig?.patch(JsonPatch.remove('/globals'));
jestConfig?.patch(JsonPatch.add('/transform', {
  '^.+\\.(t|j)sx?$': new Transform('@swc/jest'),
}));
project.synth();

