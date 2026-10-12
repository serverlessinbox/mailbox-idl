package render

import (
	"os"
	"path/filepath"
	"testing"

	"admin-api/tools/protoc-gen-go-interface/internal/model"
)

func TestFileRender(t *testing.T) {
	data := &model.FileData{
		PackageName: "admin",
		Services: []model.ServiceData{
			{
				Name: "AdminService",
				Methods: []model.MethodData{
					{
						Name:       "CreateUser",
						InputType:  "CreateUserRequest",
						OutputType: "CreateUserResponse",
					},
					{
						Name:       "DeleteUser",
						InputType:  "DeleteUserRequest",
						OutputType: "DeleteUserResponse",
					},
				},
			},
		},
	}

	output, err := File(data)
	if err != nil {
		t.Fatalf("File() error: %v", err)
	}

	// Read the golden file
	goldenPath := filepath.Join("testdata", "admin_service.golden")
	golden, err := os.ReadFile(goldenPath)
	if err != nil {
		t.Fatalf("ReadFile(%q) error: %v", goldenPath, err)
	}

	if output != string(golden) {
		t.Errorf("rendered output does not match golden file\nwant:\n%s\ngot:\n%s", golden, output)
	}
}

func TestFileRenderMultipleServices(t *testing.T) {
	data := &model.FileData{
		PackageName: "multi",
		Services: []model.ServiceData{
			{
				Name: "ServiceA",
				Methods: []model.MethodData{
					{
						Name:       "MethodA",
						InputType:  "RequestA",
						OutputType: "ResponseA",
					},
				},
			},
			{
				Name: "ServiceB",
				Methods: []model.MethodData{
					{
						Name:       "MethodB",
						InputType:  "RequestB",
						OutputType: "ResponseB",
					},
				},
			},
		},
	}

	output, err := File(data)
	if err != nil {
		t.Fatalf("File() error: %v", err)
	}

	// Read the golden file
	goldenPath := filepath.Join("testdata", "multi_service.golden")
	golden, err := os.ReadFile(goldenPath)
	if err != nil {
		t.Fatalf("ReadFile(%q) error: %v", goldenPath, err)
	}

	if output != string(golden) {
		t.Errorf("rendered output does not match golden file\nwant:\n%s\ngot:\n%s", golden, output)
	}
}

func TestFileRenderEmpty(t *testing.T) {
	data := &model.FileData{
		PackageName: "empty",
		Services:    []model.ServiceData{},
	}

	output, err := File(data)
	if err != nil {
		t.Fatalf("File() error: %v", err)
	}

	// Read the golden file
	goldenPath := filepath.Join("testdata", "empty_service.golden")
	golden, err := os.ReadFile(goldenPath)
	if err != nil {
		t.Fatalf("ReadFile(%q) error: %v", goldenPath, err)
	}

	if output != string(golden) {
		t.Errorf("rendered output does not match golden file\nwant:\n%s\ngot:\n%s", golden, output)
	}
}
