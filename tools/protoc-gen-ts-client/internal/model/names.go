package model

// ServiceName is the Go name of a proto service, such as "EmailIdentitiesService".
type ServiceName string

// MethodName is the Go name of a proto service method, such as "ListDomains".
type MethodName string

// TypeName is the Go name of a proto message, such as "ListDomainsRequest".
type TypeName string

// ProtoName is the path of a .proto file as the compiler reports it, such as "proto/idp_users.proto".
type ProtoName string

// FilePrefix is the output path of a proto file without its extension, as protogen computes it.
type FilePrefix string
