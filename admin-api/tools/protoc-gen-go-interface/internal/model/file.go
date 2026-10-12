package model

// FileData represents the data needed to render a Go interface file.
type FileData struct {
	PackageName string
	Services    []ServiceData
}

// ServiceData represents a single service in the file.
type ServiceData struct {
	Name    string
	Methods []MethodData
}

// MethodData represents a single method in a service.
type MethodData struct {
	Name       string
	InputType  string
	OutputType string
}
