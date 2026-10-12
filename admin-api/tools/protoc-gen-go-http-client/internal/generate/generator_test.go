package generate

import (
	"reflect"
	"testing"

	"admin-api/tools/protoc-gen-go-http-client/internal/model"
	"admin-api/tools/protoc-gen-go-http-client/internal/render"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
	"google.golang.org/protobuf/types/pluginpb"
)

// Pins the data the Generator hands to the renderer, using a protogen.Plugin
// built from a descriptorpb fixture so no protoc run is needed. The generated
// client files must list services in a stable order and qualify types per Go
// package, otherwise regenerating the same protos produces a different file.
//
// The fixture is deliberately declared out of alphabetical order (users.proto
// before admin.proto, ZetaService before AdminService) and holds a service in a
// file that is not generated (common.proto), so the sort and the Generate filter
// each have an input that discriminates them.

func messageDescriptor(name string) *descriptorpb.DescriptorProto {
	return &descriptorpb.DescriptorProto{Name: proto.String(name)}
}

func methodDescriptor(name, input, output string) *descriptorpb.MethodDescriptorProto {
	return &descriptorpb.MethodDescriptorProto{
		Name:       proto.String(name),
		InputType:  proto.String(input),
		OutputType: proto.String(output),
	}
}

func serviceDescriptor(name string, methods ...*descriptorpb.MethodDescriptorProto) *descriptorpb.ServiceDescriptorProto {
	return &descriptorpb.ServiceDescriptorProto{Name: proto.String(name), Method: methods}
}

func fileDescriptor(name, protoPackage, goPackage string, dependencies []string) *descriptorpb.FileDescriptorProto {
	return &descriptorpb.FileDescriptorProto{
		Name:       proto.String(name),
		Package:    proto.String(protoPackage),
		Dependency: dependencies,
		Syntax:     proto.String("proto3"),
		Options:    &descriptorpb.FileOptions{GoPackage: proto.String(goPackage)},
	}
}

func newFixturePlugin(t *testing.T, filesToGenerate []string, files ...*descriptorpb.FileDescriptorProto) *protogen.Plugin {
	t.Helper()
	plugin, err := protogen.Options{}.New(&pluginpb.CodeGeneratorRequest{
		FileToGenerate: filesToGenerate,
		ProtoFile:      files,
	})
	if err != nil {
		t.Fatalf("build plugin from fixture: %v", err)
	}
	return plugin
}

func newServicesFixture(t *testing.T) *protogen.Plugin {
	t.Helper()

	common := fileDescriptor("common.proto", "common", "example.com/gen/commonv1;commonv1", nil)
	common.MessageType = []*descriptorpb.DescriptorProto{messageDescriptor("Empty")}
	common.Service = []*descriptorpb.ServiceDescriptorProto{
		serviceDescriptor("DepService", methodDescriptor("Dep", ".common.Empty", ".common.Empty")),
	}

	users := fileDescriptor("users.proto", "users", "example.com/gen/usersv1;usersv1", []string{"common.proto"})
	users.Service = []*descriptorpb.ServiceDescriptorProto{
		serviceDescriptor("UserService", methodDescriptor("ListUsers", ".common.Empty", ".common.Empty")),
		serviceDescriptor("ZetaService", methodDescriptor("Zeta", ".common.Empty", ".common.Empty")),
	}

	admin := fileDescriptor("admin.proto", "admin", "example.com/gen/adminv1;adminv1", nil)
	admin.MessageType = []*descriptorpb.DescriptorProto{
		messageDescriptor("GetThingRequest"),
		messageDescriptor("GetThingResponse"),
		messageDescriptor("DeleteThingRequest"),
		messageDescriptor("DeleteThingResponse"),
	}
	admin.Service = []*descriptorpb.ServiceDescriptorProto{
		serviceDescriptor("AdminService",
			methodDescriptor("GetThing", ".admin.GetThingRequest", ".admin.GetThingResponse"),
			methodDescriptor("DeleteThing", ".admin.DeleteThingRequest", ".admin.DeleteThingResponse"),
		),
		serviceDescriptor("Service", methodDescriptor("Ping", ".admin.GetThingRequest", ".admin.GetThingResponse")),
	}

	noServices := fileDescriptor("empty.proto", "empty", "example.com/gen/empty;emptyv1", nil)

	return newFixturePlugin(t, []string{"users.proto", "admin.proto", "empty.proto"}, common, users, admin, noServices)
}

func newTestGenerator(plugin *protogen.Plugin) *Generator {
	return NewGenerator(plugin, &model.Config{ClientPackage: "adminclient"}, nil)
}

func findService(t *testing.T, plugin *protogen.Plugin, goName string) ServiceInfo {
	t.Helper()
	for _, file := range plugin.Files {
		for _, service := range file.Services {
			if service.GoName == goName {
				return ServiceInfo{file: file, service: service}
			}
		}
	}
	t.Fatalf("fixture has no service %q", goName)
	return ServiceInfo{}
}

func TestCollectServicesSortsByGoNameAndSkipsFilesNotGenerated(t *testing.T) {
	generator := newTestGenerator(newServicesFixture(t))

	var got []string
	for _, svc := range generator.collectServices() {
		got = append(got, svc.service.GoName)
	}

	want := []string{"AdminService", "Service", "UserService", "ZetaService"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v, want %v", got, want)
	}
}

func TestCompoundClientData(t *testing.T) {
	t.Run("one field per service in sorted order with the Service suffix trimmed", func(t *testing.T) {
		got := newTestGenerator(newServicesFixture(t)).compoundClientData()

		want := render.CompoundClientData{
			PackageName: "adminclient",
			Services: []render.ServiceFieldData{
				{FieldName: "Admin", ClientName: "AdminServiceClient"},
				{FieldName: "Service", ClientName: "ServiceClient"},
				{FieldName: "User", ClientName: "UserServiceClient"},
				{FieldName: "Zeta", ClientName: "ZetaServiceClient"},
			},
		}
		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %+v, want %+v", got, want)
		}
	})

	t.Run("no services leaves the field list empty", func(t *testing.T) {
		plugin := newFixturePlugin(t, nil)

		got := newTestGenerator(plugin).compoundClientData()

		want := render.CompoundClientData{PackageName: "adminclient"}
		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %+v, want %+v", got, want)
		}
	})
}

func TestExternalServiceClientData(t *testing.T) {
	plugin := newServicesFixture(t)
	generator := newTestGenerator(plugin)
	genFile := plugin.NewGeneratedFile("client.go", protogen.GoImportPath(""))

	t.Run("service interface and message types are qualified by their Go package", func(t *testing.T) {
		svc := findService(t, plugin, "AdminService")

		got := generator.externalServiceClientData(genFile, svc.file, svc.service)

		want := render.ServiceClientData{
			ClientName:       "AdminServiceClient",
			ServiceInterface: "adminv1.AdminService",
			ServicePath:      `kebabCaseServicePath("AdminService")`,
			Methods: []render.MethodData{
				{MethodName: "GetThing", InputType: "adminv1.GetThingRequest", OutputType: "adminv1.GetThingResponse", ClientName: "AdminServiceClient"},
				{MethodName: "DeleteThing", InputType: "adminv1.DeleteThingRequest", OutputType: "adminv1.DeleteThingResponse", ClientName: "AdminServiceClient"},
			},
		}
		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %+v, want %+v", got, want)
		}
	})

	t.Run("a message from another proto package keeps its own package qualifier", func(t *testing.T) {
		svc := findService(t, plugin, "UserService")

		got := generator.externalServiceClientData(genFile, svc.file, svc.service)

		want := render.ServiceClientData{
			ClientName:       "UserServiceClient",
			ServiceInterface: "usersv1.UserService",
			ServicePath:      `kebabCaseServicePath("UserService")`,
			Methods: []render.MethodData{
				{MethodName: "ListUsers", InputType: "commonv1.Empty", OutputType: "commonv1.Empty", ClientName: "UserServiceClient"},
			},
		}
		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %+v, want %+v", got, want)
		}
	})
}

func TestPerFileServiceClientData(t *testing.T) {
	plugin := newServicesFixture(t)
	generator := newTestGenerator(plugin)

	t.Run("types declared in the file's own package are unqualified", func(t *testing.T) {
		svc := findService(t, plugin, "AdminService")
		genFile := plugin.NewGeneratedFile("admin_http_client.pb.go", svc.file.GoImportPath)

		got := generator.perFileServiceClientData(genFile, svc.service)

		want := render.ServiceClientData{
			ClientName:       "AdminServiceClient",
			ServiceInterface: "AdminService",
			ServicePath:      `kebabCaseServicePath("AdminService")`,
			Methods: []render.MethodData{
				{MethodName: "GetThing", InputType: "GetThingRequest", OutputType: "GetThingResponse", ClientName: "AdminServiceClient"},
				{MethodName: "DeleteThing", InputType: "DeleteThingRequest", OutputType: "DeleteThingResponse", ClientName: "AdminServiceClient"},
			},
		}
		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %+v, want %+v", got, want)
		}
	})

	t.Run("types from another Go package are qualified", func(t *testing.T) {
		svc := findService(t, plugin, "UserService")
		genFile := plugin.NewGeneratedFile("users_http_client.pb.go", svc.file.GoImportPath)

		got := generator.perFileServiceClientData(genFile, svc.service)

		if len(got.Methods) != 1 || got.Methods[0].InputType != "commonv1.Empty" {
			t.Errorf("got methods %+v, want one method with input commonv1.Empty", got.Methods)
		}
	})
}
