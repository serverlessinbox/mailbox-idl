package naming

import (
	"path/filepath"
	"strings"

	"tools/protoc-gen-ts-client/internal/model"
)

// Naming converts proto and Go identifiers into the names, paths and import
// specifiers used in the generated TypeScript.
type Naming struct{}

// NewNaming returns a Naming.
func NewNaming() *Naming {
	return &Naming{}
}

// HandlerName lower-cases the first character of a method name: ListDomains -> listDomains.
func (n *Naming) HandlerName(method model.MethodName) string {
	s := string(method)
	if s == "" {
		return s
	}
	return strings.ToLower(s[:1]) + s[1:]
}

// ClientName is the generated client class of a service: DomainsService -> DomainsServiceClient.
func (n *Naming) ClientName(service model.ServiceName) string {
	return string(service) + "Client"
}

// PropertyName is the wrapper client property of a service: EmailIdentitiesService -> emailIdentities.
func (n *Naming) PropertyName(service model.ServiceName) string {
	s := string(service)
	if s == "" {
		return s
	}
	return strings.ToLower(s[:1]) + strings.TrimSuffix(s[1:], "Service")
}

// ServicePath is the URL path segment of a service: EmailIdentitiesService -> email-identities.
func (n *Naming) ServicePath(service model.ServiceName) string {
	return n.CamelToKebab(strings.TrimSuffix(string(service), "Service"))
}

// CamelToKebab lower-cases s and puts a hyphen before every upper-case ASCII letter except a leading one.
func (n *Naming) CamelToKebab(s string) string {
	var result strings.Builder
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			result.WriteRune('-')
		}
		result.WriteRune(r)
	}
	return strings.ToLower(result.String())
}

// BasePath derives the service base path from the proto file name: proto/idp_users.proto -> /idp-users.
func (n *Naming) BasePath(proto model.ProtoName) string {
	name := filepath.Base(string(proto))
	name = strings.TrimSuffix(name, filepath.Ext(name))
	name = strings.ReplaceAll(name, "_", "-")
	if strings.HasPrefix(name, "/") {
		return name
	}
	return "/" + name
}

// PbImport is the sibling-module specifier of a file's protobuf types: domains/v1/domains -> ./domains_pb.
func (n *Naming) PbImport(prefix model.FilePrefix) string {
	s := string(prefix)
	return "./" + s[strings.LastIndex(s, "/")+1:] + "_pb"
}

// ClientImportPath is the index-relative module specifier of a generated client file.
func (n *Naming) ClientImportPath(prefix model.FilePrefix) string {
	return "./" + string(prefix) + "_client"
}

// IndexPbModule is the index-relative module specifier of a file's protobuf types.
func (n *Naming) IndexPbModule(prefix model.FilePrefix) string {
	return "./" + string(prefix) + "_pb"
}
