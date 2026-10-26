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

func TestConfigSetAcceptsHandlerContextModule(t *testing.T) {
	cfg := NewConfig()
	if err := cfg.Set("handler_context_module", "@example/sdk"); err != nil {
		t.Fatalf("Set returned %v for handler_context_module", err)
	}
	if cfg.HandlerContextModule != "@example/sdk" {
		t.Fatalf("HandlerContextModule = %q, want %q", cfg.HandlerContextModule, "@example/sdk")
	}
}

// An empty module would render `from ”` and break every generated service file.
func TestConfigSetRejectsEmptyHandlerContextModule(t *testing.T) {
	cfg := NewConfig()
	if err := cfg.Set("handler_context_module", ""); err == nil {
		t.Fatal("Set returned nil for an empty handler_context_module")
	}
}
