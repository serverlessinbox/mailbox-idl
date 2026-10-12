package model

import (
	"strings"
	"testing"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

// Pins how the plugin reads its parameters through protogen.Options: protogen
// consumes its own standard parameters, every remaining one must be a known
// plugin parameter, and an unknown one aborts the run instead of being ignored.
// The buf template passes a misspelt parameter through unchanged, so silently
// accepting it would generate with defaults and hide the typo.

func loadThroughProtogen(t *testing.T, parameter string) (*Config, error) {
	t.Helper()
	loader := NewConfigLoader()
	_, err := protogen.Options{ParamFunc: loader.Set}.New(&pluginpb.CodeGeneratorRequest{
		Parameter: &parameter,
	})
	if err != nil {
		return nil, err
	}
	return loader.Config(), nil
}

func TestConfigLoaderKnownParameters(t *testing.T) {
	tests := []struct {
		name      string
		parameter string
		want      Config
	}{
		{
			name:      "no parameters yields defaults",
			parameter: "",
			want: Config{
				ClientPackage:          "adminclient",
				ClientFilename:         "admin_api_http_client.pb.go",
				CompoundClientFilename: "admin_api_client.pb.go",
			},
		},
		{
			name: "every parameter the buf template passes",
			parameter: "client_mode=external,client_package=mypackage,client_filename=gen/my_client.pb.go," +
				"compound_client=true,compound_client_filename=gen/my_compound.pb.go",
			want: Config{
				ClientMode:             "external",
				ClientPackage:          "mypackage",
				ClientFilename:         "gen/my_client.pb.go",
				CompoundClient:         true,
				CompoundClientFilename: "gen/my_compound.pb.go",
			},
		},
		{
			name:      "compound_client=false stays disabled",
			parameter: "client_mode=external,compound_client=false",
			want: Config{
				ClientMode:             "external",
				ClientPackage:          "adminclient",
				ClientFilename:         "admin_api_http_client.pb.go",
				CompoundClientFilename: "admin_api_client.pb.go",
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := loadThroughProtogen(t, tt.parameter)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if *got != tt.want {
				t.Errorf("got %+v, want %+v", *got, tt.want)
			}
		})
	}
}

func TestConfigLoaderRejectsUnknownParameter(t *testing.T) {
	_, err := loadThroughProtogen(t, "client_mode=external,client_pakage=typo")
	if err == nil {
		t.Fatal("expected an error for an unknown parameter, got nil")
	}
	if !strings.Contains(err.Error(), `"client_pakage"`) {
		t.Errorf("error %q does not name the unknown parameter", err)
	}
}

func TestConfigLoaderRejectsNonBooleanCompoundClient(t *testing.T) {
	_, err := loadThroughProtogen(t, "compound_client=maybe")
	if err == nil {
		t.Fatal("expected an error for a non-boolean compound_client, got nil")
	}
	if !strings.Contains(err.Error(), "compound_client") || !strings.Contains(err.Error(), `"maybe"`) {
		t.Errorf("error %q does not name the parameter and its value", err)
	}
}

func TestConfigLoaderLeavesProtogenStandardParametersToProtogen(t *testing.T) {
	got, err := loadThroughProtogen(t, "module=example.com/x,paths=import,annotate_code=false,client_mode=external")
	if err != nil {
		t.Fatalf("standard protogen parameters must not reach the plugin's own parser: %v", err)
	}
	if got.ClientMode != "external" {
		t.Errorf("ClientMode: got %q, want %q", got.ClientMode, "external")
	}
}
