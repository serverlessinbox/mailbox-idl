package source

import (
	"testing"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
	"google.golang.org/protobuf/types/pluginpb"
)

// The reader is the only code that interprets protogen descriptors. These
// cases build a descriptor in memory (no protoc) and pin the two decisions the
// generated client depends on: whether a request has a required field and
// whether a method streams.

func scalarField(name string, number int32, label descriptorpb.FieldDescriptorProto_Label) *descriptorpb.FieldDescriptorProto {
	return &descriptorpb.FieldDescriptorProto{
		Name:   proto.String(name),
		Number: proto.Int32(number),
		Label:  label.Enum(),
		Type:   descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
	}
}

func readSampleFile(t *testing.T) *protogen.File {
	t.Helper()
	optional := scalarField("note", 1, descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL)
	optional.Proto3Optional = proto.Bool(true)
	optional.OneofIndex = proto.Int32(0)

	file := &descriptorpb.FileDescriptorProto{
		Name:    proto.String("proto/sample_things.proto"),
		Package: proto.String("sample"),
		Syntax:  proto.String("proto3"),
		Options: &descriptorpb.FileOptions{GoPackage: proto.String("example.com/sample;samplepb")},
		MessageType: []*descriptorpb.DescriptorProto{
			{Name: proto.String("Empty")},
			{
				Name:      proto.String("OnlyOptional"),
				Field:     []*descriptorpb.FieldDescriptorProto{optional},
				OneofDecl: []*descriptorpb.OneofDescriptorProto{{Name: proto.String("_note")}},
			},
			{
				Name: proto.String("OnlyRepeated"),
				Field: []*descriptorpb.FieldDescriptorProto{
					scalarField("ids", 1, descriptorpb.FieldDescriptorProto_LABEL_REPEATED),
				},
			},
			{
				Name:  proto.String("WithRequired"),
				Field: []*descriptorpb.FieldDescriptorProto{scalarField("id", 1, descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL)},
			},
		},
		Service: []*descriptorpb.ServiceDescriptorProto{{
			Name: proto.String("ThingsService"),
			Method: []*descriptorpb.MethodDescriptorProto{
				{Name: proto.String("Plain"), InputType: proto.String(".sample.Empty"), OutputType: proto.String(".sample.Empty")},
				{Name: proto.String("Optional"), InputType: proto.String(".sample.OnlyOptional"), OutputType: proto.String(".sample.Empty")},
				{Name: proto.String("Repeated"), InputType: proto.String(".sample.OnlyRepeated"), OutputType: proto.String(".sample.Empty")},
				{Name: proto.String("Required"), InputType: proto.String(".sample.WithRequired"), OutputType: proto.String(".sample.Empty")},
				{Name: proto.String("Watch"), InputType: proto.String(".sample.Empty"), OutputType: proto.String(".sample.Empty"), ServerStreaming: proto.Bool(true)},
			},
		}},
		SourceCodeInfo: &descriptorpb.SourceCodeInfo{Location: []*descriptorpb.SourceCodeInfo_Location{
			{Path: []int32{6, 0}, Span: []int32{0, 0, 0}, LeadingComments: proto.String(" Things.\n")},
			{Path: []int32{6, 0, 2, 3}, Span: []int32{0, 0, 0}, LeadingComments: proto.String(" Needs an id.\n")},
		}},
	}
	plugin, err := protogen.Options{}.New(&pluginpb.CodeGeneratorRequest{
		FileToGenerate: []string{file.GetName()},
		Parameter:      proto.String("paths=source_relative"),
		ProtoFile:      []*descriptorpb.FileDescriptorProto{file},
	})
	if err != nil {
		t.Fatalf("building plugin: %v", err)
	}
	return plugin.Files[0]
}

func TestReadFile(t *testing.T) {
	got := NewReader().ReadFile(readSampleFile(t))

	if got.ProtoName != "proto/sample_things.proto" || got.Prefix != "proto/sample_things" {
		t.Errorf("ProtoName = %q, Prefix = %q", got.ProtoName, got.Prefix)
	}
	if len(got.Services) != 1 {
		t.Fatalf("Services has %d entries", len(got.Services))
	}
	service := got.Services[0]
	if service.Name != "ThingsService" || service.Comment != " Things.\n" {
		t.Errorf("service = %q with comment %q", service.Name, service.Comment)
	}

	cases := []struct {
		method      string
		hasRequired bool
		streaming   bool
		comment     string
	}{
		{"Plain", false, false, ""},
		{"Optional", false, false, ""},
		{"Repeated", false, false, ""},
		{"Required", true, false, " Needs an id.\n"},
		{"Watch", false, true, ""},
	}
	if len(service.Methods) != len(cases) {
		t.Fatalf("Methods has %d entries, want %d", len(service.Methods), len(cases))
	}
	for i, tc := range cases {
		method := service.Methods[i]
		if string(method.Name) != tc.method {
			t.Fatalf("method %d = %q, want %q", i, method.Name, tc.method)
		}
		if method.HasRequiredFields != tc.hasRequired {
			t.Errorf("%s HasRequiredFields = %v, want %v", tc.method, method.HasRequiredFields, tc.hasRequired)
		}
		if method.Streaming != tc.streaming {
			t.Errorf("%s Streaming = %v, want %v", tc.method, method.Streaming, tc.streaming)
		}
		if string(method.Comment) != tc.comment {
			t.Errorf("%s Comment = %q, want %q", tc.method, method.Comment, tc.comment)
		}
	}
	if service.Methods[3].Input != "WithRequired" || service.Methods[3].Output != "Empty" {
		t.Errorf("Required types = %q, %q", service.Methods[3].Input, service.Methods[3].Output)
	}
}
