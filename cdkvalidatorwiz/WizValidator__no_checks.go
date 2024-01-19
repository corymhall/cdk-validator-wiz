//go:build no_runtime_type_checking

package cdkvalidatorwiz

// Building without runtime type checking enabled, so all the below just return nil

func (w *jsiiProxy_WizValidator) validateValidateParameters(context awscdk.IPolicyValidationContextBeta1) error {
	return nil
}

func validateNewWizValidatorParameters(props *WizValidatorProps) error {
	return nil
}

