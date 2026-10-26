package generate

import (
	"fmt"

	"tools/protoc-gen-ts-client/internal/config"
	"tools/protoc-gen-ts-client/internal/model"
	"tools/protoc-gen-ts-client/internal/naming"
	"tools/protoc-gen-ts-client/internal/render"
)

// Generator turns the proto model into the text of the TypeScript files. It
// holds no protogen types, so it runs without protoc.
type Generator struct {
	renderer *render.Renderer
	naming   *naming.Naming
	config   *config.Config
}

// NewGenerator returns a Generator that renders with renderer, names with naming
// and reads its parameters from cfg when it generates a file.
func NewGenerator(renderer *render.Renderer, names *naming.Naming, cfg *config.Config) *Generator {
	return &Generator{renderer: renderer, naming: names, config: cfg}
}

// GenerateFile renders the client file and the service definition file of every
// service in file, client first, in service order.
func (g *Generator) GenerateFile(file model.File) (FileOutputs, error) {
	var result FileOutputs
	for _, service := range file.Services {
		client, err := g.renderer.ServiceClient(g.serviceClientData(file, service))
		if err != nil {
			return FileOutputs{}, fmt.Errorf("service %s: %w", service.Name, err)
		}
		result.Files = append(result.Files, Output{Filename: string(file.Prefix) + "_client.ts", Content: client})

		if g.config.HandlerContextModule != "" {
			definition, err := g.renderer.ServiceDefinition(g.serviceDefinitionData(file, service))
			if err != nil {
				return FileOutputs{}, fmt.Errorf("service %s: %w", service.Name, err)
			}
			result.Files = append(result.Files, Output{Filename: string(file.Prefix) + "_service.ts", Content: definition})
		}

		result.Services = append(result.Services, model.ServiceRef{
			Name:       service.Name,
			ClientName: g.naming.ClientName(service.Name),
			ImportPath: g.naming.ClientImportPath(file.Prefix),
		})
	}
	return result, nil
}

// GenerateWrapper renders client.ts, the unified client over all services, and
// index.ts, which re-exports every client and every protobuf module.
func (g *Generator) GenerateWrapper(services []model.ServiceRef, files []model.File) ([]Output, error) {
	wrapper, err := g.renderer.WrapperClient(g.wrapperClientData(services))
	if err != nil {
		return nil, fmt.Errorf("client.ts: %w", err)
	}
	index, err := g.renderer.Index(g.indexData(services, files))
	if err != nil {
		return nil, fmt.Errorf("index.ts: %w", err)
	}
	return []Output{
		{Filename: "client.ts", Content: wrapper},
		{Filename: "index.ts", Content: index},
	}, nil
}

func (g *Generator) serviceDefinitionData(file model.File, service model.Service) render.ServiceDefinitionData {
	var methods []render.RuntimeMethod
	for _, method := range service.Methods {
		if method.Streaming {
			continue
		}
		methods = append(methods, render.RuntimeMethod{
			Name:        string(method.Name),
			HandlerName: g.naming.HandlerName(method.Name),
			Input:       string(method.Input),
			Output:      string(method.Output),
		})
	}
	return render.ServiceDefinitionData{
		Imports:              g.importsData(file, service),
		ServiceName:          string(service.Name),
		BasePath:             g.naming.BasePath(file.ProtoName),
		HandlerContextModule: g.config.HandlerContextModule,
		Methods:              methods,
	}
}

func (g *Generator) serviceClientData(file model.File, service model.Service) render.ServiceClientData {
	var methods []render.ClientMethodData
	for _, method := range service.Methods {
		if method.Streaming {
			continue
		}
		methods = append(methods, g.clientMethodData(method))
	}
	clientName := g.naming.ClientName(service.Name)
	return render.ServiceClientData{
		Imports:    g.importsData(file, service),
		ClientName: clientName,
		Doc: render.DocCommentData{
			Indent:   "",
			Lines:    service.Comment.Lines(),
			Fallback: fmt.Sprintf("%s client - AWS SDK-style client for %s", service.Name, service.Name),
		},
		Methods: methods,
	}
}

func (g *Generator) clientMethodData(method model.Method) render.ClientMethodData {
	return render.ClientMethodData{
		Name:            string(method.Name),
		TSName:          g.naming.HandlerName(method.Name),
		Input:           string(method.Input),
		Output:          string(method.Output),
		OptionalRequest: !method.HasRequiredFields,
		Doc: render.DocCommentData{
			Indent:   "  ",
			Lines:    method.Comment.Lines(),
			Fallback: fmt.Sprintf("%s - Send %s request", method.Name, method.Name),
		},
	}
}

func (g *Generator) importsData(file model.File, service model.Service) render.PbImportsData {
	methods := make([]render.MessageTypes, 0, len(service.Methods))
	for _, method := range service.Methods {
		methods = append(methods, render.MessageTypes{Input: string(method.Input), Output: string(method.Output)})
	}
	return render.PbImportsData{PbImport: g.naming.PbImport(file.Prefix), Methods: methods}
}

func (g *Generator) wrapperClientData(services []model.ServiceRef) render.WrapperClientData {
	entries := make([]render.WrapperServiceData, 0, len(services))
	for _, service := range services {
		entries = append(entries, render.WrapperServiceData{
			ClientName: service.ClientName,
			PropName:   g.naming.PropertyName(service.Name),
			Path:       g.naming.ServicePath(service.Name),
		})
	}
	return render.WrapperClientData{Services: entries}
}

func (g *Generator) indexData(services []model.ServiceRef, files []model.File) render.IndexData {
	clients := make([]render.IndexClientData, 0, len(services))
	for _, service := range services {
		clients = append(clients, render.IndexClientData{ClientName: service.ClientName, ImportPath: service.ImportPath})
	}
	modules := make([]string, 0, len(files))
	for _, file := range files {
		modules = append(modules, g.naming.IndexPbModule(file.Prefix))
	}
	return render.IndexData{Clients: clients, PbModules: modules}
}
