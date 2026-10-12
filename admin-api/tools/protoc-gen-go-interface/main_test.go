package main

import (
	"flag"
	"testing"
)

func TestFlagSetHandlesUnknownParameters(t *testing.T) {
	// Test that flag.FlagSet properly rejects unknown plugin parameters.
	// Standard protogen parameters (like module=) are handled by protogen itself
	// and never reach the ParamFunc.
	var flags flag.FlagSet

	// This simulates what would happen if an unknown parameter is passed
	// to the plugin - flag.FlagSet will reject it
	err := flags.Set("unknown_param", "value")
	if err == nil {
		t.Error("Expected error for unknown parameter, got nil")
	}
}
