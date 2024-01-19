package cdkvalidatorwiz


type WizValidatorProps struct {
	// The severity level to fail on. Any violations with a severity >= this level will cause the validation to fail.
	//
	// The failure severity configured in wiz will always take precedence, but this
	// can be used to fail on a lower severity than the default.
	// Default: - the default configured in wiz (probably Severity.CRITICAL)
	//
	FailOnSeverity Severity `field:"optional" json:"failOnSeverity" yaml:"failOnSeverity"`
	// The severity level to report on.
	//
	// Any violations with a severity lower than this level will not be reported.
	// Default: - Severity.MEDIUM
	//
	ReportOnSeverity Severity `field:"optional" json:"reportOnSeverity" yaml:"reportOnSeverity"`
}

