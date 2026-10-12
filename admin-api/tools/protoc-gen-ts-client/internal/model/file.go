package model

// Method is a unary or streaming RPC of a service, reduced to what the TypeScript output needs.
type Method struct {
	Name    MethodName
	Input   TypeName
	Output  TypeName
	Comment Comment
	// Streaming is true when either side of the RPC streams; streaming methods are imported but not emitted.
	Streaming bool
	// HasRequiredFields is true when the request has a field that is neither optional, repeated nor a map.
	HasRequiredFields bool
}

// Service is a proto service with its methods in declaration order.
type Service struct {
	Name    ServiceName
	Comment Comment
	Methods []Method
}

// File is a proto file selected for generation with its services.
type File struct {
	ProtoName ProtoName
	Prefix    FilePrefix
	Services  []Service
}

// ServiceRef locates the generated client of a service for the wrapper client and the index.
type ServiceRef struct {
	Name       ServiceName
	ClientName string
	ImportPath string
}
