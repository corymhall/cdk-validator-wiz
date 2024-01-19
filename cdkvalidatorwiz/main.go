// cdk-validator-wiz
package cdkvalidatorwiz

import (
	"reflect"

	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
)

func init() {
	_jsii_.RegisterEnum(
		"cdk-validator-wiz.Severity",
		reflect.TypeOf((*Severity)(nil)).Elem(),
		map[string]interface{}{
			"MEDIUM": Severity_MEDIUM,
			"LOW": Severity_LOW,
			"INFO": Severity_INFO,
			"HIGH": Severity_HIGH,
			"CRITICAL": Severity_CRITICAL,
		},
	)
	_jsii_.RegisterClass(
		"cdk-validator-wiz.WizValidator",
		reflect.TypeOf((*WizValidator)(nil)).Elem(),
		[]_jsii_.Member{
			_jsii_.MemberProperty{JsiiProperty: "name", GoGetter: "Name"},
			_jsii_.MemberProperty{JsiiProperty: "ruleIds", GoGetter: "RuleIds"},
			_jsii_.MemberMethod{JsiiMethod: "validate", GoMethod: "Validate"},
			_jsii_.MemberProperty{JsiiProperty: "version", GoGetter: "Version"},
		},
		func() interface{} {
			j := jsiiProxy_WizValidator{}
			_jsii_.InitJsiiProxy(&j.Type__awscdkIPolicyValidationPluginBeta1)
			return &j
		},
	)
	_jsii_.RegisterStruct(
		"cdk-validator-wiz.WizValidatorProps",
		reflect.TypeOf((*WizValidatorProps)(nil)).Elem(),
	)
}
