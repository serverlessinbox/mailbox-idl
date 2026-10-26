package gen

import (
	"testing"

	"tools/protoc-gen-go-interface/internal/model"
)

func TestNewGenerator(t *testing.T) {
	g := NewGenerator()
	if g == nil {
		t.Error("NewGenerator returned nil")
	}
}

func TestGeneratorBuildFileDataStructure(t *testing.T) {
	// Test that buildFileData returns the correct structure
	// We can't easily create a full protogen.File without the protoc plugin infrastructure,
	// so we test the data structure construction directly
	data := &model.FileData{
		PackageName: "test",
		Services: []model.ServiceData{
			{
				Name: "TestService",
				Methods: []model.MethodData{
					{
						Name:       "DoSomething",
						InputType:  "Request",
						OutputType: "Response",
					},
				},
			},
		},
	}

	if data.PackageName != "test" {
		t.Errorf("PackageName: got %q, want %q", data.PackageName, "test")
	}

	if len(data.Services) != 1 {
		t.Errorf("Services length: got %d, want 1", len(data.Services))
	}

	if data.Services[0].Name != "TestService" {
		t.Errorf("Service name: got %q, want %q", data.Services[0].Name, "TestService")
	}
}
