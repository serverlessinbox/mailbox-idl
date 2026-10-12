package config

import (
	"strings"
	"testing"
)

// An unknown plugin parameter must fail the run with a message naming it,
// otherwise a mistyped buf option would be silently ignored.
func TestConfigSetRejectsUnknownParameter(t *testing.T) {
	err := NewConfig().Set("flavour", "strict")
	if err == nil {
		t.Fatal("Set returned nil for an unknown parameter")
	}
	if !strings.Contains(err.Error(), `"flavour"`) {
		t.Fatalf("error %q does not name the parameter", err)
	}
}
