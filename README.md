# CDK Validator Wiz

CDK Validator Plugin for [Wiz](https://www.wiz.io/)

<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

> The APIs of higher level constructs in this module are experimental and under active development.
> They are subject to non-backward compatible changes or removal in any future version. These are
> not subject to the [Semantic Versioning](https://semver.org/) model and breaking changes will be
> announced in the release notes. This means that while you may use them, you may need to update
> your source code when upgrading to a newer version of this package.
---

<!--END STABILITY BANNER-->

## Installing

### TypeScript/JavaScript

```bash
npm install @cdklabs/cdk-validator-cfnguard
```


### Go

```bash
go get github.com/corymhall/cdk-validator-wiz/cdkvalidatorwiz
```


## Usage

To use this plugin in your CDK application add it to the CDK App.

```ts
import { App } from 'aws-cdk-lib';
import { WizValidator } from 'cdk-validator-wiz';

new App({
  policyValidationBeta1: [
    new WizValidator(),
  ],
});
```

For more usage information, see the [API docs](./API.md)
