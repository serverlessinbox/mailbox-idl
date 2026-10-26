package source

import (
	"google.golang.org/protobuf/compiler/protogen"

	"tools/protoc-gen-ts-client/internal/model"
)

// Reader converts protogen descriptors into the plugin's own model. It is the
// only place that reads protogen types.
type Reader struct{}

// NewReader returns a Reader.
func NewReader() *Reader {
	return &Reader{}
}

// ReadFile converts a proto file and its services.
func (r *Reader) ReadFile(file *protogen.File) model.File {
	services := make([]model.Service, 0, len(file.Services))
	for _, service := range file.Services {
		services = append(services, r.readService(service))
	}
	return model.File{
		ProtoName: model.ProtoName(file.Proto.GetName()),
		Prefix:    model.FilePrefix(file.GeneratedFilenamePrefix),
		Services:  services,
	}
}

func (r *Reader) readService(service *protogen.Service) model.Service {
	methods := make([]model.Method, 0, len(service.Methods))
	for _, method := range service.Methods {
		methods = append(methods, r.readMethod(method))
	}
	return model.Service{
		Name:    model.ServiceName(service.GoName),
		Comment: model.Comment(service.Comments.Leading),
		Methods: methods,
	}
}

func (r *Reader) readMethod(method *protogen.Method) model.Method {
	return model.Method{
		Name:              model.MethodName(method.GoName),
		Input:             model.TypeName(method.Input.GoIdent.GoName),
		Output:            model.TypeName(method.Output.GoIdent.GoName),
		Comment:           model.Comment(method.Comments.Leading),
		Streaming:         method.Desc.IsStreamingClient() || method.Desc.IsStreamingServer(),
		HasRequiredFields: r.hasRequiredFields(method.Input),
	}
}

func (r *Reader) hasRequiredFields(message *protogen.Message) bool {
	for _, field := range message.Fields {
		if !field.Desc.HasOptionalKeyword() && !field.Desc.IsList() && !field.Desc.IsMap() {
			return true
		}
	}
	return false
}
