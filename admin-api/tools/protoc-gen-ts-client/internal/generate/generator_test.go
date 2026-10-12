package generate

import (
	"reflect"
	"strings"
	"testing"

	"admin-api/tools/protoc-gen-ts-client/internal/model"
	"admin-api/tools/protoc-gen-ts-client/internal/naming"
	"admin-api/tools/protoc-gen-ts-client/internal/render"
)

// The generator decides which methods reach the output, how each is named and
// which file names are produced. The text of each file is pinned in the render
// package; these tests pin the data the templates receive and the file set.

func newTestGenerator(t *testing.T) *Generator {
	t.Helper()
	renderer, err := render.NewRenderer()
	if err != nil {
		t.Fatalf("NewRenderer: %v", err)
	}
	return NewGenerator(renderer, naming.NewNaming())
}

func sampleFile() model.File {
	return model.File{
		ProtoName: "proto/email_identities.proto",
		Prefix:    "email_identities",
		Services: []model.Service{{
			Name:    "EmailIdentitiesService",
			Comment: " Manages identities.\n",
			Methods: []model.Method{
				{Name: "ListIdentities", Input: "ListIdentitiesRequest", Output: "ListIdentitiesResponse", HasRequiredFields: false},
				{Name: "GetIdentity", Input: "GetIdentityRequest", Output: "GetIdentityResponse", Comment: " Gets one.\n", HasRequiredFields: true},
				{Name: "WatchIdentities", Input: "WatchRequest", Output: "WatchResponse", Streaming: true},
			},
		}},
	}
}

func TestServiceDefinitionDataSkipsStreamingMethodsButImportsThem(t *testing.T) {
	file := sampleFile()
	data := newTestGenerator(t).serviceDefinitionData(file, file.Services[0])

	wantMethods := []render.RuntimeMethod{
		{Name: "ListIdentities", HandlerName: "listIdentities", Input: "ListIdentitiesRequest", Output: "ListIdentitiesResponse"},
		{Name: "GetIdentity", HandlerName: "getIdentity", Input: "GetIdentityRequest", Output: "GetIdentityResponse"},
	}
	if !reflect.DeepEqual(data.Methods, wantMethods) {
		t.Errorf("Methods = %#v, want %#v", data.Methods, wantMethods)
	}
	if len(data.Imports.Methods) != 3 {
		t.Errorf("Imports.Methods has %d entries, want all 3 methods", len(data.Imports.Methods))
	}
	if data.BasePath != "/email-identities" || data.Imports.PbImport != "./email_identities_pb" {
		t.Errorf("BasePath = %q, PbImport = %q", data.BasePath, data.Imports.PbImport)
	}
}

func TestServiceClientDataDocAndOptionalRequest(t *testing.T) {
	file := sampleFile()
	data := newTestGenerator(t).serviceClientData(file, file.Services[0])

	if data.ClientName != "EmailIdentitiesServiceClient" {
		t.Errorf("ClientName = %q", data.ClientName)
	}
	if !reflect.DeepEqual(data.Doc.Lines, []string{"Manages identities."}) {
		t.Errorf("Doc.Lines = %#v", data.Doc.Lines)
	}
	wantFallback := "EmailIdentitiesService client - AWS SDK-style client for EmailIdentitiesService"
	if data.Doc.Fallback != wantFallback {
		t.Errorf("Doc.Fallback = %q, want %q", data.Doc.Fallback, wantFallback)
	}
	if len(data.Methods) != 2 {
		t.Fatalf("Methods has %d entries, want the 2 non-streaming ones", len(data.Methods))
	}
	list, get := data.Methods[0], data.Methods[1]
	if !list.OptionalRequest || get.OptionalRequest {
		t.Errorf("OptionalRequest list=%v get=%v, want true and false", list.OptionalRequest, get.OptionalRequest)
	}
	if list.Doc.Fallback != "ListIdentities - Send ListIdentities request" || len(list.Doc.Lines) != 0 {
		t.Errorf("list.Doc = %#v", list.Doc)
	}
	if !reflect.DeepEqual(get.Doc.Lines, []string{"Gets one."}) || get.Doc.Indent != "  " {
		t.Errorf("get.Doc = %#v", get.Doc)
	}
}

func TestGenerateFileEmitsClientThenServiceAndRefs(t *testing.T) {
	result, err := newTestGenerator(t).GenerateFile(sampleFile())
	if err != nil {
		t.Fatalf("GenerateFile: %v", err)
	}
	var names []string
	for _, output := range result.Files {
		names = append(names, output.Filename)
	}
	wantNames := []string{"email_identities_client.ts", "email_identities_service.ts"}
	if !reflect.DeepEqual(names, wantNames) {
		t.Errorf("files = %v, want %v", names, wantNames)
	}
	wantRefs := []model.ServiceRef{{Name: "EmailIdentitiesService", ClientName: "EmailIdentitiesServiceClient", ImportPath: "./email_identities_client"}}
	if !reflect.DeepEqual(result.Services, wantRefs) {
		t.Errorf("Services = %#v, want %#v", result.Services, wantRefs)
	}
	if strings.Contains(result.Files[0].Content, "watchIdentities") {
		t.Error("client contains the streaming method")
	}
}

func TestGenerateFileWithoutServicesEmitsNothing(t *testing.T) {
	result, err := newTestGenerator(t).GenerateFile(model.File{ProtoName: "common.proto", Prefix: "common"})
	if err != nil {
		t.Fatalf("GenerateFile: %v", err)
	}
	if len(result.Files) != 0 || len(result.Services) != 0 {
		t.Errorf("result = %#v, want empty", result)
	}
}

func TestGenerateWrapperListsEveryServiceAndFile(t *testing.T) {
	files := []model.File{{Prefix: "common"}, sampleFile()}
	refs := []model.ServiceRef{{Name: "EmailIdentitiesService", ClientName: "EmailIdentitiesServiceClient", ImportPath: "./email_identities_client"}}

	outputs, err := newTestGenerator(t).GenerateWrapper(refs, files)
	if err != nil {
		t.Fatalf("GenerateWrapper: %v", err)
	}
	if len(outputs) != 2 || outputs[0].Filename != "client.ts" || outputs[1].Filename != "index.ts" {
		t.Fatalf("outputs = %#v", outputs)
	}
	if !strings.Contains(outputs[0].Content, "readonly emailIdentities: EmailIdentitiesServiceClient;") ||
		!strings.Contains(outputs[0].Content, "endpoint: `${baseUrl}/email-identities`,") {
		t.Errorf("client.ts lacks the service entry:\n%s", outputs[0].Content)
	}
	for _, want := range []string{
		"export { EmailIdentitiesServiceClient } from './email_identities_client';",
		"export * from './common_pb';",
		"export * from './email_identities_pb';",
	} {
		if !strings.Contains(outputs[1].Content, want) {
			t.Errorf("index.ts lacks %q:\n%s", want, outputs[1].Content)
		}
	}
}
