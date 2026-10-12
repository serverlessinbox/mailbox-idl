package naming

import (
	"testing"

	"admin-api/tools/protoc-gen-ts-client/internal/model"
)

// These conversions decide generated file names, URL paths and TypeScript
// identifiers; a change in any of them silently renames the public SDK.

func TestHandlerName(t *testing.T) {
	cases := []struct{ in, want string }{
		{"", ""},
		{"A", "a"},
		{"ListDomains", "listDomains"},
		{"listDomains", "listDomains"},
		{"GetURL", "getURL"},
	}
	for _, tc := range cases {
		if got := NewNaming().HandlerName(model.MethodName(tc.in)); got != tc.want {
			t.Errorf("HandlerName(%q) = %q, want %q", tc.in, got, tc.want)
		}
	}
}

func TestCamelToKebab(t *testing.T) {
	cases := []struct{ in, want string }{
		{"", ""},
		{"Domains", "domains"},
		{"EmailIdentities", "email-identities"},
		{"emailIdentities", "email-identities"},
		{"MailFeedback", "mail-feedback"},
		{"ABC", "a-b-c"},
		{"already-kebab", "already-kebab"},
		{"Idp2Users", "idp2-users"},
	}
	for _, tc := range cases {
		if got := NewNaming().CamelToKebab(tc.in); got != tc.want {
			t.Errorf("CamelToKebab(%q) = %q, want %q", tc.in, got, tc.want)
		}
	}
}

func TestBasePath(t *testing.T) {
	cases := []struct{ in, want string }{
		{"idp_users.proto", "/idp-users"},
		{"proto/idp_users.proto", "/idp-users"},
		{"a/b/domains.proto", "/domains"},
		{"noextension", "/noextension"},
		{"dotted.name.proto", "/dotted.name"},
		{"", "/"},
		{"/", "/"},
	}
	for _, tc := range cases {
		if got := NewNaming().BasePath(model.ProtoName(tc.in)); got != tc.want {
			t.Errorf("BasePath(%q) = %q, want %q", tc.in, got, tc.want)
		}
	}
}

func TestServiceNames(t *testing.T) {
	n := NewNaming()
	cases := []struct {
		service                       model.ServiceName
		client, property, servicePath string
	}{
		{"DomainsService", "DomainsServiceClient", "domains", "domains"},
		{"EmailIdentitiesService", "EmailIdentitiesServiceClient", "emailIdentities", "email-identities"},
		{"Audit", "AuditClient", "audit", "audit"},
		{"Service", "ServiceClient", "service", ""},
	}
	for _, tc := range cases {
		if got := n.ClientName(tc.service); got != tc.client {
			t.Errorf("ClientName(%q) = %q, want %q", tc.service, got, tc.client)
		}
		if got := n.PropertyName(tc.service); got != tc.property {
			t.Errorf("PropertyName(%q) = %q, want %q", tc.service, got, tc.property)
		}
		if got := n.ServicePath(tc.service); got != tc.servicePath {
			t.Errorf("ServicePath(%q) = %q, want %q", tc.service, got, tc.servicePath)
		}
	}
}

func TestImportSpecifiers(t *testing.T) {
	n := NewNaming()
	cases := []struct {
		prefix                        model.FilePrefix
		pbImport, clientPath, indexPb string
	}{
		{"domains", "./domains_pb", "./domains_client", "./domains_pb"},
		{"domains/v1/domains", "./domains_pb", "./domains/v1/domains_client", "./domains/v1/domains_pb"},
	}
	for _, tc := range cases {
		if got := n.PbImport(tc.prefix); got != tc.pbImport {
			t.Errorf("PbImport(%q) = %q, want %q", tc.prefix, got, tc.pbImport)
		}
		if got := n.ClientImportPath(tc.prefix); got != tc.clientPath {
			t.Errorf("ClientImportPath(%q) = %q, want %q", tc.prefix, got, tc.clientPath)
		}
		if got := n.IndexPbModule(tc.prefix); got != tc.indexPb {
			t.Errorf("IndexPbModule(%q) = %q, want %q", tc.prefix, got, tc.indexPb)
		}
	}
}
