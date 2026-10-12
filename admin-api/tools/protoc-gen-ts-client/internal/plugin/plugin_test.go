package plugin

import (
	"strings"
	"testing"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
	"google.golang.org/protobuf/types/pluginpb"

	"admin-api/tools/protoc-gen-ts-client/internal/generate"
	"admin-api/tools/protoc-gen-ts-client/internal/naming"
	"admin-api/tools/protoc-gen-ts-client/internal/render"
	"admin-api/tools/protoc-gen-ts-client/internal/source"
)

// The wrapper client and index must be written exactly when at least one
// service exists, and only for the files protoc asked to generate.

func protoFile(name string, withService bool) *descriptorpb.FileDescriptorProto {
	pkg := strings.TrimSuffix(name, ".proto")
	file := &descriptorpb.FileDescriptorProto{
		Name:        proto.String(name),
		Package:     proto.String(pkg),
		Syntax:      proto.String("proto3"),
		Options:     &descriptorpb.FileOptions{GoPackage: proto.String("example.com/" + pkg + ";" + pkg + "pb")},
		MessageType: []*descriptorpb.DescriptorProto{{Name: proto.String("Empty")}},
	}
	if withService {
		file.Service = []*descriptorpb.ServiceDescriptorProto{{
			Name: proto.String("ThingsService"),
			Method: []*descriptorpb.MethodDescriptorProto{{
				Name:       proto.String("Plain"),
				InputType:  proto.String("." + pkg + ".Empty"),
				OutputType: proto.String("." + pkg + ".Empty"),
			}},
		}}
	}
	return file
}

func runPlugin(t *testing.T, files ...*descriptorpb.FileDescriptorProto) []string {
	t.Helper()
	renderer, err := render.NewRenderer()
	if err != nil {
		t.Fatalf("NewRenderer: %v", err)
	}
	tsPlugin := NewPlugin(source.NewReader(), generate.NewGenerator(renderer, naming.NewNaming()))

	var toGenerate []string
	for _, file := range files {
		toGenerate = append(toGenerate, file.GetName())
	}
	gen, err := protogen.Options{}.New(&pluginpb.CodeGeneratorRequest{
		FileToGenerate: toGenerate,
		Parameter:      proto.String("paths=source_relative"),
		ProtoFile:      files,
	})
	if err != nil {
		t.Fatalf("building plugin: %v", err)
	}
	if err := tsPlugin.Run(gen); err != nil {
		t.Fatalf("Run: %v", err)
	}
	response := gen.Response()
	if response.GetError() != "" {
		t.Fatalf("response error: %s", response.GetError())
	}
	var names []string
	for _, file := range response.File {
		names = append(names, file.GetName())
	}
	return names
}

func TestRunWritesPerServiceFilesThenWrapperAndIndex(t *testing.T) {
	got := runPlugin(t, protoFile("common.proto", false), protoFile("things.proto", true))
	want := []string{"things_client.ts", "things_service.ts", "client.ts", "index.ts"}
	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("files = %v, want %v", got, want)
	}
}

func TestRunWithoutServicesWritesNothing(t *testing.T) {
	if got := runPlugin(t, protoFile("common.proto", false)); len(got) != 0 {
		t.Errorf("files = %v, want none", got)
	}
}
