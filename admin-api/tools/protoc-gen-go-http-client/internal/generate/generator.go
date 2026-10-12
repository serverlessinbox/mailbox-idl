package generate

import (
	"fmt"
	"sort"

	"admin-api/tools/protoc-gen-go-http-client/internal/model"
	"admin-api/tools/protoc-gen-go-http-client/internal/render"
	"google.golang.org/protobuf/compiler/protogen"
)

// Generator generates HTTP client code from protobuf definitions.
type Generator struct {
	plugin   *protogen.Plugin
	config   *model.Config
	renderer *render.Renderer
}

// NewGenerator creates a new Generator with the given dependencies.
func NewGenerator(plugin *protogen.Plugin, config *model.Config, renderer *render.Renderer) *Generator {
	return &Generator{
		plugin:   plugin,
		config:   config,
		renderer: renderer,
	}
}

// GenerateExternalClient generates the external mode client files.
func (g *Generator) GenerateExternalClient() error {
	// Generate the main client file with shared helpers and service clients.
	if err := g.generateMainExternalFile(); err != nil {
		return err
	}

	// Generate the compound client if enabled.
	if g.config.CompoundClient {
		if err := g.generateCompoundFile(); err != nil {
			return err
		}
	}

	return nil
}

// GeneratePerFileClients generates HTTP client code for each proto file.
func (g *Generator) GeneratePerFileClients() error {
	for _, file := range g.plugin.Files {
		if !file.Generate {
			continue
		}
		if err := g.generateFileClients(file); err != nil {
			return fmt.Errorf("generate clients for %s: %w", file.Desc.Path(), err)
		}
	}
	return nil
}

// generateMainExternalFile generates the primary external client file with all service clients.
func (g *Generator) generateMainExternalFile() error {
	genFile := g.plugin.NewGeneratedFile(g.config.ClientFilename, protogen.GoImportPath(""))

	// Render file header.
	headerOutput, err := g.renderer.RenderExternalFileHeader(render.ExternalFileHeaderData{
		PackageName: g.config.ClientPackage,
	})
	if err != nil {
		return fmt.Errorf("render external file header: %w", err)
	}
	genFile.P(headerOutput)

	// Render shared helpers.
	helpersOutput, err := g.renderer.RenderSharedHelpers()
	if err != nil {
		return fmt.Errorf("render shared helpers: %w", err)
	}
	genFile.P(helpersOutput)

	// Collect and render service clients.
	services := g.collectServices()
	for _, svc := range services {
		if err := g.renderServiceClientExternal(genFile, svc.file, svc.service); err != nil {
			return fmt.Errorf("render service client for %s: %w", svc.service.GoName, err)
		}
	}

	return nil
}

// generateCompoundFile generates the compound client file that wraps all service clients.
func (g *Generator) generateCompoundFile() error {
	// Render compound client.
	compoundOutput, err := g.renderer.RenderCompoundClient(g.compoundClientData())
	if err != nil {
		return fmt.Errorf("render compound client: %w", err)
	}

	genFile := g.plugin.NewGeneratedFile(g.config.CompoundClientFilename, protogen.GoImportPath(""))
	genFile.P(compoundOutput)

	return nil
}

// renderServiceClientExternal renders a service client for the external client mode.
func (g *Generator) renderServiceClientExternal(genFile *protogen.GeneratedFile, file *protogen.File, service *protogen.Service) error {
	// Render service client.
	clientOutput, err := g.renderer.RenderServiceClient(g.externalServiceClientData(genFile, file, service))
	if err != nil {
		return fmt.Errorf("render service client: %w", err)
	}

	genFile.P(clientOutput)
	return nil
}

// generateFileClients generates clients for a single proto file.
func (g *Generator) generateFileClients(file *protogen.File) error {
	if len(file.Services) == 0 {
		return nil
	}

	filename := file.GeneratedFilenamePrefix + "_http_client.pb.go"
	genFile := g.plugin.NewGeneratedFile(filename, file.GoImportPath)

	// Render file header.
	headerOutput, err := g.renderer.RenderFileHeader(render.FileHeaderData{
		SourcePath:  file.Desc.Path(),
		PackageName: string(file.GoPackageName),
	})
	if err != nil {
		return fmt.Errorf("render file header: %w", err)
	}
	genFile.P(headerOutput)

	// Render shared helpers.
	helpersOutput, err := g.renderer.RenderSharedHelpers()
	if err != nil {
		return fmt.Errorf("render shared helpers: %w", err)
	}
	genFile.P(helpersOutput)

	// Render each service client.
	for _, service := range file.Services {
		if err := g.renderServiceClient(genFile, service); err != nil {
			return fmt.Errorf("render service client %s: %w", service.GoName, err)
		}
	}

	return nil
}

// renderServiceClient renders a service client for per-file mode.
func (g *Generator) renderServiceClient(genFile *protogen.GeneratedFile, service *protogen.Service) error {
	// Render service client.
	clientOutput, err := g.renderer.RenderServiceClient(g.perFileServiceClientData(genFile, service))
	if err != nil {
		return fmt.Errorf("render service client: %w", err)
	}

	genFile.P(clientOutput)
	return nil
}

// collectServices collects all services from the plugin files that should be generated.
func (g *Generator) collectServices() []ServiceInfo {
	var services []ServiceInfo
	for _, file := range g.plugin.Files {
		if !file.Generate {
			continue
		}
		if len(file.Services) == 0 {
			continue
		}
		for _, service := range file.Services {
			services = append(services, ServiceInfo{file: file, service: service})
		}
	}
	// Sort for deterministic output.
	g.sortServices(services)
	return services
}

// sortServices sorts services by GoName for deterministic output.
func (g *Generator) sortServices(services []ServiceInfo) {
	sort.Slice(services, func(i, j int) bool {
		return services[i].service.GoName < services[j].service.GoName
	})
}

// fieldNameForService returns the field name for a service in a compound client.
func (g *Generator) fieldNameForService(service *protogen.Service) string {
	fieldName := service.GoName
	if suffix := "Service"; len(fieldName) > len(suffix) && fieldName[len(fieldName)-len(suffix):] == suffix {
		fieldName = fieldName[:len(fieldName)-len(suffix)]
	}
	if fieldName == "" {
		fieldName = service.GoName
	}
	return fieldName
}

// compoundClientData builds the data for the compound client from the collected services.
func (g *Generator) compoundClientData() render.CompoundClientData {
	services := g.collectServices()

	// Build compound client data.
	var serviceFields []render.ServiceFieldData
	for _, svc := range services {
		fieldName := g.fieldNameForService(svc.service)
		serviceFields = append(serviceFields, render.ServiceFieldData{
			FieldName:  fieldName,
			ClientName: svc.service.GoName + "Client",
		})
	}

	return render.CompoundClientData{
		PackageName: g.config.ClientPackage,
		Services:    serviceFields,
	}
}

// externalServiceClientData builds the data for a service client whose service
// interface lives in another package and is referenced by its qualified identifier.
func (g *Generator) externalServiceClientData(genFile *protogen.GeneratedFile, file *protogen.File, service *protogen.Service) render.ServiceClientData {
	serviceInterface := genFile.QualifiedGoIdent(protogen.GoIdent{
		GoName:       service.GoName,
		GoImportPath: file.GoImportPath,
	})
	return g.serviceClientData(genFile, service, serviceInterface)
}

// perFileServiceClientData builds the data for a service client whose service
// interface is declared in the same package as the generated file.
func (g *Generator) perFileServiceClientData(genFile *protogen.GeneratedFile, service *protogen.Service) render.ServiceClientData {
	return g.serviceClientData(genFile, service, service.GoName)
}

// serviceClientData builds the data shared by both client modes for one service.
func (g *Generator) serviceClientData(genFile *protogen.GeneratedFile, service *protogen.Service, serviceInterface string) render.ServiceClientData {
	clientName := service.GoName + "Client"
	servicePath := "kebabCaseServicePath(\"" + service.GoName + "\")"

	// Build method data.
	var methods []render.MethodData
	for _, method := range service.Methods {
		input := genFile.QualifiedGoIdent(method.Input.GoIdent)
		output := genFile.QualifiedGoIdent(method.Output.GoIdent)

		methods = append(methods, render.MethodData{
			MethodName: method.GoName,
			InputType:  input,
			OutputType: output,
			ClientName: clientName,
		})
	}

	return render.ServiceClientData{
		ClientName:       clientName,
		ServiceInterface: serviceInterface,
		ServicePath:      servicePath,
		Methods:          methods,
	}
}

// ServiceInfo represents a collected service from the plugin.
type ServiceInfo struct {
	file    *protogen.File
	service *protogen.Service
}
