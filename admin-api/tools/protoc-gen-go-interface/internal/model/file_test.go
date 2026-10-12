package model

import (
	"testing"
)

func TestFileDataConstruction(t *testing.T) {
	methods := []MethodData{
		{
			Name:       "GetUser",
			InputType:  "GetUserRequest",
			OutputType: "GetUserResponse",
		},
	}

	service := ServiceData{
		Name:    "UserService",
		Methods: methods,
	}

	file := FileData{
		PackageName: "mypackage",
		Services:    []ServiceData{service},
	}

	if file.PackageName != "mypackage" {
		t.Errorf("PackageName: got %q, want %q", file.PackageName, "mypackage")
	}

	if len(file.Services) != 1 {
		t.Errorf("Services length: got %d, want 1", len(file.Services))
	}

	if file.Services[0].Name != "UserService" {
		t.Errorf("Service name: got %q, want %q", file.Services[0].Name, "UserService")
	}

	if len(file.Services[0].Methods) != 1 {
		t.Errorf("Methods length: got %d, want 1", len(file.Services[0].Methods))
	}

	if file.Services[0].Methods[0].Name != "GetUser" {
		t.Errorf("Method name: got %q, want %q", file.Services[0].Methods[0].Name, "GetUser")
	}
}
