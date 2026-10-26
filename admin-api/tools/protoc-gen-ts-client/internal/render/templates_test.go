package render

import (
	"flag"
	"os"
	"path/filepath"
	"testing"
)

// Each block of templates.tmpl is pinned byte for byte by a golden file. The
// generated TypeScript is never reformatted, so a stray blank line or space in
// a template changes the published SDK. Regenerate with: go test ./internal/render -update

var update = flag.Bool("update", false, "rewrite the golden files from the current templates")

func assertGolden(t *testing.T, name string, got string, err error) {
	t.Helper()
	if err != nil {
		t.Fatalf("render %s: %v", name, err)
	}
	path := filepath.Join("testdata", name+".golden")
	if *update {
		if writeErr := os.WriteFile(path, []byte(got), 0o644); writeErr != nil {
			t.Fatalf("writing %s: %v", path, writeErr)
		}
	}
	want, readErr := os.ReadFile(path)
	if readErr != nil {
		t.Fatalf("reading %s: %v", path, readErr)
	}
	if got != string(want) {
		t.Errorf("%s differs from %s\n--- got ---\n%s\n--- want ---\n%s", name, path, got, want)
	}
}

func newTestRenderer(t *testing.T) *Renderer {
	t.Helper()
	renderer, err := NewRenderer()
	if err != nil {
		t.Fatalf("NewRenderer: %v", err)
	}
	return renderer
}

func sampleImports() PbImportsData {
	return PbImportsData{
		PbImport: "./domains_pb",
		Methods: []MessageTypes{
			{Input: "ListDomainsRequest", Output: "ListDomainsResponse"},
			{Input: "WatchDomainsRequest", Output: "WatchDomainsResponse"},
		},
	}
}

func sampleClientMethod() ClientMethodData {
	return ClientMethodData{
		Name:            "ListDomains",
		TSName:          "listDomains",
		Input:           "ListDomainsRequest",
		Output:          "ListDomainsResponse",
		OptionalRequest: true,
		Doc:             DocCommentData{Indent: "  ", Lines: []string{"Lists domains.", "", "Paged."}, Fallback: "unused"},
	}
}

func TestBannerGolden(t *testing.T) {
	got, err := newTestRenderer(t).Banner()
	assertGolden(t, "banner", got, err)
}

func TestPbImportsGolden(t *testing.T) {
	got, err := newTestRenderer(t).PbImports(sampleImports())
	assertGolden(t, "pb_imports", got, err)
}

func TestDocCommentGolden(t *testing.T) {
	renderer := newTestRenderer(t)
	t.Run("lines", func(t *testing.T) {
		got, err := renderer.DocComment(DocCommentData{Indent: "  ", Lines: []string{"First.", "", "Last."}, Fallback: "unused"})
		assertGolden(t, "doc_comment_lines", got, err)
	})
	t.Run("fallback", func(t *testing.T) {
		got, err := renderer.DocComment(DocCommentData{Indent: "", Lines: nil, Fallback: "DomainsService client - AWS SDK-style client for DomainsService"})
		assertGolden(t, "doc_comment_fallback", got, err)
	})
}

func TestServiceDefinitionGolden(t *testing.T) {
	got, err := newTestRenderer(t).ServiceDefinition(ServiceDefinitionData{
		Imports:              sampleImports(),
		ServiceName:          "DomainsService",
		BasePath:             "/domains",
		HandlerContextModule: "@example/sdk",
		Methods: []RuntimeMethod{
			{Name: "ListDomains", HandlerName: "listDomains", Input: "ListDomainsRequest", Output: "ListDomainsResponse"},
		},
	})
	assertGolden(t, "service_definition", got, err)
}

func TestClientMethodGolden(t *testing.T) {
	renderer := newTestRenderer(t)
	t.Run("optional_request", func(t *testing.T) {
		got, err := renderer.ClientMethod(sampleClientMethod())
		assertGolden(t, "client_method_optional", got, err)
	})
	t.Run("required_request_with_fallback_doc", func(t *testing.T) {
		method := sampleClientMethod()
		method.OptionalRequest = false
		method.Doc = DocCommentData{Indent: "  ", Lines: nil, Fallback: "ListDomains - Send ListDomains request"}
		got, err := renderer.ClientMethod(method)
		assertGolden(t, "client_method_required", got, err)
	})
}

func TestServiceClientGolden(t *testing.T) {
	renderer := newTestRenderer(t)
	data := ServiceClientData{
		Imports:    sampleImports(),
		ClientName: "DomainsServiceClient",
		Doc:        DocCommentData{Indent: "", Lines: []string{"Manages domains."}, Fallback: "unused"},
		Methods:    []ClientMethodData{sampleClientMethod()},
	}
	t.Run("with_methods", func(t *testing.T) {
		got, err := renderer.ServiceClient(data)
		assertGolden(t, "service_client", got, err)
	})
	t.Run("without_methods", func(t *testing.T) {
		data.Methods = nil
		got, err := renderer.ServiceClient(data)
		assertGolden(t, "service_client_no_methods", got, err)
	})
}

func TestWrapperClientGolden(t *testing.T) {
	got, err := newTestRenderer(t).WrapperClient(WrapperClientData{
		Services: []WrapperServiceData{
			{ClientName: "DomainsServiceClient", PropName: "domains", Path: "domains"},
			{ClientName: "EmailIdentitiesServiceClient", PropName: "emailIdentities", Path: "email-identities"},
		},
	})
	assertGolden(t, "wrapper_client", got, err)
}

func TestIndexGolden(t *testing.T) {
	got, err := newTestRenderer(t).Index(IndexData{
		Clients: []IndexClientData{
			{ClientName: "DomainsServiceClient", ImportPath: "./domains_client"},
			{ClientName: "UsersServiceClient", ImportPath: "./users_client"},
		},
		PbModules: []string{"./common_pb", "./domains_pb", "./users_pb"},
	})
	assertGolden(t, "index", got, err)
}
