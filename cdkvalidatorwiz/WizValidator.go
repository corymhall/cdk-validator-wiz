package cdkvalidatorwiz

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
	_init_ "github.com/corymhall/cdk-validator-wiz/cdkvalidatorwiz/jsii"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/corymhall/cdk-validator-wiz/cdkvalidatorwiz/internal"
)

type WizValidator interface {
	awscdk.IPolicyValidationPluginBeta1
	// The name of the plugin that will be displayed in the validation report.
	Name() *string
	// The list of rule IDs that the plugin will evaluate.
	//
	// Used for analytics
	// purposes.
	RuleIds() *[]*string
	// The version of the plugin, following the Semantic Versioning specification (see https://semver.org/). This version is used for analytics purposes, to measure the usage of different plugins and different versions. The value of this property should be kept in sync with the actual version of the software package. If the version is not provided or is not a valid semantic version, it will be reported as `0.0.0`.
	Version() *string
	// The method that will be called by the CDK framework to perform validations.
	//
	// This is where the plugin will evaluate the CloudFormation
	// templates for compliance and report and violations.
	Validate(context awscdk.IPolicyValidationContextBeta1) *awscdk.PolicyValidationPluginReportBeta1
}

// The jsii proxy struct for WizValidator
type jsiiProxy_WizValidator struct {
	internal.Type__awscdkIPolicyValidationPluginBeta1
}

func (j *jsiiProxy_WizValidator) Name() *string {
	var returns *string
	_jsii_.Get(
		j,
		"name",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_WizValidator) RuleIds() *[]*string {
	var returns *[]*string
	_jsii_.Get(
		j,
		"ruleIds",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_WizValidator) Version() *string {
	var returns *string
	_jsii_.Get(
		j,
		"version",
		&returns,
	)
	return returns
}


func NewWizValidator(props *WizValidatorProps) WizValidator {
	_init_.Initialize()

	if err := validateNewWizValidatorParameters(props); err != nil {
		panic(err)
	}
	j := jsiiProxy_WizValidator{}

	_jsii_.Create(
		"cdk-validator-wiz.WizValidator",
		[]interface{}{props},
		&j,
	)

	return &j
}

func NewWizValidator_Override(w WizValidator, props *WizValidatorProps) {
	_init_.Initialize()

	_jsii_.Create(
		"cdk-validator-wiz.WizValidator",
		[]interface{}{props},
		w,
	)
}

func (w *jsiiProxy_WizValidator) Validate(context awscdk.IPolicyValidationContextBeta1) *awscdk.PolicyValidationPluginReportBeta1 {
	if err := w.validateValidateParameters(context); err != nil {
		panic(err)
	}
	var returns *awscdk.PolicyValidationPluginReportBeta1

	_jsii_.Invoke(
		w,
		"validate",
		[]interface{}{context},
		&returns,
	)

	return returns
}

