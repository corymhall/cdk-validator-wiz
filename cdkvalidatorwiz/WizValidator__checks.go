//go:build !no_runtime_type_checking

package cdkvalidatorwiz

import (
	"fmt"

	_jsii_ "github.com/aws/jsii-runtime-go/runtime"

	"github.com/aws/aws-cdk-go/awscdk/v2"
)

func (w *jsiiProxy_WizValidator) validateValidateParameters(context awscdk.IPolicyValidationContextBeta1) error {
	if context == nil {
		return fmt.Errorf("parameter context is required, but nil was provided")
	}

	return nil
}

func validateNewWizValidatorParameters(props *WizValidatorProps) error {
	if err := _jsii_.ValidateStruct(props, func() string { return "parameter props" }); err != nil {
		return err
	}

	return nil
}

