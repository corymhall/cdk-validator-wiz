# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### WizValidatorProps <a name="WizValidatorProps" id="cdk-validator-wiz.WizValidatorProps"></a>

#### Initializer <a name="Initializer" id="cdk-validator-wiz.WizValidatorProps.Initializer"></a>

```typescript
import { WizValidatorProps } from 'cdk-validator-wiz'

const wizValidatorProps: WizValidatorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-validator-wiz.WizValidatorProps.property.failOnSeverity">failOnSeverity</a></code> | <code><a href="#cdk-validator-wiz.Severity">Severity</a></code> | The severity level to fail on. Any violations with a severity >= this level will cause the validation to fail. |
| <code><a href="#cdk-validator-wiz.WizValidatorProps.property.reportOnSeverity">reportOnSeverity</a></code> | <code><a href="#cdk-validator-wiz.Severity">Severity</a></code> | The severity level to report on. |

---

##### `failOnSeverity`<sup>Optional</sup> <a name="failOnSeverity" id="cdk-validator-wiz.WizValidatorProps.property.failOnSeverity"></a>

```typescript
public readonly failOnSeverity: Severity;
```

- *Type:* <a href="#cdk-validator-wiz.Severity">Severity</a>
- *Default:* the default configured in wiz (probably Severity.CRITICAL)

The severity level to fail on. Any violations with a severity >= this level will cause the validation to fail.

The failure severity configured in wiz will always take precedence, but this
can be used to fail on a lower severity than the default.

---

##### `reportOnSeverity`<sup>Optional</sup> <a name="reportOnSeverity" id="cdk-validator-wiz.WizValidatorProps.property.reportOnSeverity"></a>

```typescript
public readonly reportOnSeverity: Severity;
```

- *Type:* <a href="#cdk-validator-wiz.Severity">Severity</a>
- *Default:* Severity.MEDIUM

The severity level to report on.

Any violations with a severity lower than this level will not be reported.

---

## Classes <a name="Classes" id="Classes"></a>

### WizValidator <a name="WizValidator" id="cdk-validator-wiz.WizValidator"></a>

- *Implements:* aws-cdk-lib.IPolicyValidationPluginBeta1

#### Initializers <a name="Initializers" id="cdk-validator-wiz.WizValidator.Initializer"></a>

```typescript
import { WizValidator } from 'cdk-validator-wiz'

new WizValidator(props?: WizValidatorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-validator-wiz.WizValidator.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-validator-wiz.WizValidatorProps">WizValidatorProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-validator-wiz.WizValidator.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-validator-wiz.WizValidatorProps">WizValidatorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-validator-wiz.WizValidator.validate">validate</a></code> | The method that will be called by the CDK framework to perform validations. |

---

##### `validate` <a name="validate" id="cdk-validator-wiz.WizValidator.validate"></a>

```typescript
public validate(context: IPolicyValidationContextBeta1): PolicyValidationPluginReportBeta1
```

The method that will be called by the CDK framework to perform validations.

This is where the plugin will evaluate the CloudFormation
templates for compliance and report and violations

###### `context`<sup>Required</sup> <a name="context" id="cdk-validator-wiz.WizValidator.validate.parameter.context"></a>

- *Type:* aws-cdk-lib.IPolicyValidationContextBeta1

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-validator-wiz.WizValidator.property.name">name</a></code> | <code>string</code> | The name of the plugin that will be displayed in the validation report. |
| <code><a href="#cdk-validator-wiz.WizValidator.property.ruleIds">ruleIds</a></code> | <code>string[]</code> | The list of rule IDs that the plugin will evaluate. |
| <code><a href="#cdk-validator-wiz.WizValidator.property.version">version</a></code> | <code>string</code> | The version of the plugin, following the Semantic Versioning specification (see https://semver.org/). This version is used for analytics purposes, to measure the usage of different plugins and different versions. The value of this property should be kept in sync with the actual version of the software package. If the version is not provided or is not a valid semantic version, it will be reported as `0.0.0`. |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-validator-wiz.WizValidator.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the plugin that will be displayed in the validation report.

---

##### `ruleIds`<sup>Optional</sup> <a name="ruleIds" id="cdk-validator-wiz.WizValidator.property.ruleIds"></a>

```typescript
public readonly ruleIds: string[];
```

- *Type:* string[]

The list of rule IDs that the plugin will evaluate.

Used for analytics
purposes.

---

##### `version`<sup>Optional</sup> <a name="version" id="cdk-validator-wiz.WizValidator.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

The version of the plugin, following the Semantic Versioning specification (see https://semver.org/). This version is used for analytics purposes, to measure the usage of different plugins and different versions. The value of this property should be kept in sync with the actual version of the software package. If the version is not provided or is not a valid semantic version, it will be reported as `0.0.0`.

---



## Enums <a name="Enums" id="Enums"></a>

### Severity <a name="Severity" id="cdk-validator-wiz.Severity"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-validator-wiz.Severity.MEDIUM">MEDIUM</a></code> | *No description.* |
| <code><a href="#cdk-validator-wiz.Severity.LOW">LOW</a></code> | *No description.* |
| <code><a href="#cdk-validator-wiz.Severity.INFO">INFO</a></code> | *No description.* |
| <code><a href="#cdk-validator-wiz.Severity.HIGH">HIGH</a></code> | *No description.* |
| <code><a href="#cdk-validator-wiz.Severity.CRITICAL">CRITICAL</a></code> | *No description.* |

---

##### `MEDIUM` <a name="MEDIUM" id="cdk-validator-wiz.Severity.MEDIUM"></a>

---


##### `LOW` <a name="LOW" id="cdk-validator-wiz.Severity.LOW"></a>

---


##### `INFO` <a name="INFO" id="cdk-validator-wiz.Severity.INFO"></a>

---


##### `HIGH` <a name="HIGH" id="cdk-validator-wiz.Severity.HIGH"></a>

---


##### `CRITICAL` <a name="CRITICAL" id="cdk-validator-wiz.Severity.CRITICAL"></a>

---

