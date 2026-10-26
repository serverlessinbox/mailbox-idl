package gen

import (
	"google.golang.org/protobuf/compiler/protogen"

	"tools/protoc-gen-go-interface/internal/model"
	"tools/protoc-gen-go-interface/internal/render"
)

// Generator generates interface files for proto services.
type Generator struct{}

// GenerateFile generates the interface file for a given proto file.
func (g *Generator) GenerateFile(plugin *protogen.Plugin, file *protogen.File) error {
	if len(file.Services) == 0 {
		return nil
	}

	filename := file.GeneratedFilenamePrefix + ".interface.go"
	output := plugin.NewGeneratedFile(filename, file.GoImportPath)

	data := g.buildFileData(file)
	content, err := render.File(data)
	if err != nil {
		return err
	}

	output.P(content)

	return nil
}

// buildFileData constructs the FileData needed for rendering.
func (g *Generator) buildFileData(file *protogen.File) *model.FileData {
	services := make([]model.ServiceData, 0, len(file.Services))

	for _, service := range file.Services {
		methods := make([]model.MethodData, 0)

		for _, method := range service.Methods {
			// Skip streaming methods
			if method.Desc.IsStreamingClient() || method.Desc.IsStreamingServer() {
				continue
			}

			methods = append(methods, model.MethodData{
				Name:       method.GoName,
				InputType:  method.Input.GoIdent.GoName,
				OutputType: method.Output.GoIdent.GoName,
			})
		}

		services = append(services, model.ServiceData{
			Name:    service.GoName,
			Methods: methods,
		})
	}

	return &model.FileData{
		PackageName: string(file.GoPackageName),
		Services:    services,
	}
}

// NewGenerator creates a new Generator.
func NewGenerator() *Generator {
	return &Generator{}
}
