package plugin

import (
	"fmt"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"

	"admin-api/tools/protoc-gen-ts-client/internal/generate"
	"admin-api/tools/protoc-gen-ts-client/internal/model"
	"admin-api/tools/protoc-gen-ts-client/internal/source"
)

// Plugin runs one protoc invocation: it reads the requested proto files,
// generates the TypeScript for them and writes the results into the protogen
// response.
type Plugin struct {
	reader    *source.Reader
	generator *generate.Generator
}

// NewPlugin returns a Plugin that reads with reader and generates with generator.
func NewPlugin(reader *source.Reader, generator *generate.Generator) *Plugin {
	return &Plugin{reader: reader, generator: generator}
}

// Run generates the per-service files for every requested proto file, then the
// wrapper client and the index when at least one service exists.
func (p *Plugin) Run(gen *protogen.Plugin) error {
	gen.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)

	var files []model.File
	var services []model.ServiceRef
	for _, protoFile := range gen.Files {
		if !protoFile.Generate {
			continue
		}
		file := p.reader.ReadFile(protoFile)
		files = append(files, file)

		generated, err := p.generator.GenerateFile(file)
		if err != nil {
			return fmt.Errorf("%s: %w", file.ProtoName, err)
		}
		p.write(gen, generated.Files, protoFile.GoImportPath)
		services = append(services, generated.Services...)
	}

	if len(services) == 0 {
		return nil
	}
	wrapper, err := p.generator.GenerateWrapper(services, files)
	if err != nil {
		return err
	}
	p.write(gen, wrapper, "")
	return nil
}

func (p *Plugin) write(gen *protogen.Plugin, outputs []generate.Output, importPath protogen.GoImportPath) {
	for _, output := range outputs {
		gen.NewGeneratedFile(output.Filename, importPath).Write([]byte(output.Content))
	}
}
