package render

// MessageTypes names the request and response message types of one method.
type MessageTypes struct {
	Input  string
	Output string
}

// PbImportsData feeds the "pbImports" block: the type-only and the schema
// imports from one protobuf module.
type PbImportsData struct {
	PbImport string
	Methods  []MessageTypes
}

// DocCommentData feeds the "docComment" block. Fallback is the single line
// used when Lines is empty.
type DocCommentData struct {
	Indent   string
	Lines    []string
	Fallback string
}

// RuntimeMethod is one non-streaming method of a service definition.
type RuntimeMethod struct {
	Name        string
	HandlerName string
	Input       string
	Output      string
}

// ServiceDefinitionData feeds the "serviceDefinition" block.
type ServiceDefinitionData struct {
	Imports     PbImportsData
	ServiceName string
	BasePath    string
	Methods     []RuntimeMethod
}

// ClientMethodData feeds the "clientMethod" block.
type ClientMethodData struct {
	Name            string
	TSName          string
	Input           string
	Output          string
	OptionalRequest bool
	Doc             DocCommentData
}

// ServiceClientData feeds the "serviceClient" block. Imports lists every
// method of the service, Methods only the non-streaming ones.
type ServiceClientData struct {
	Imports    PbImportsData
	ClientName string
	Doc        DocCommentData
	Methods    []ClientMethodData
}

// WrapperServiceData is one service entry of the wrapper client.
type WrapperServiceData struct {
	ClientName string
	PropName   string
	Path       string
}

// WrapperClientData feeds the "wrapperClient" block.
type WrapperClientData struct {
	Services []WrapperServiceData
}

// IndexClientData is one client re-export of the index.
type IndexClientData struct {
	ClientName string
	ImportPath string
}

// IndexData feeds the "index" block. PbModules are the module specifiers re-exported with "export *".
type IndexData struct {
	Clients   []IndexClientData
	PbModules []string
}
