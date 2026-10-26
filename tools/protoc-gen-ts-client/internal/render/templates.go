package render

import (
	_ "embed"
	"fmt"
	"text/template"
)

//go:embed templates.tmpl
var templateSource string

// NoData is the data of a block that renders constant text.
type NoData struct{}

// Renderer renders every block of templates.tmpl. Each method renders one
// block with the data type that block declares.
type Renderer struct {
	banner            block[NoData]
	pbImports         block[PbImportsData]
	docComment        block[DocCommentData]
	serviceDefinition block[ServiceDefinitionData]
	clientMethod      block[ClientMethodData]
	serviceClient     block[ServiceClientData]
	wrapperClient     block[WrapperClientData]
	index             block[IndexData]
}

// NewRenderer parses the embedded templates once and binds every block.
func NewRenderer() (*Renderer, error) {
	templates, err := template.New("templates.tmpl").Parse(templateSource)
	if err != nil {
		return nil, fmt.Errorf("parsing templates.tmpl: %w", err)
	}
	r := &Renderer{}
	bindings := []error{
		bind(templates, "banner", &r.banner),
		bind(templates, "pbImports", &r.pbImports),
		bind(templates, "docComment", &r.docComment),
		bind(templates, "serviceDefinition", &r.serviceDefinition),
		bind(templates, "clientMethod", &r.clientMethod),
		bind(templates, "serviceClient", &r.serviceClient),
		bind(templates, "wrapperClient", &r.wrapperClient),
		bind(templates, "index", &r.index),
	}
	for _, bindErr := range bindings {
		if bindErr != nil {
			return nil, bindErr
		}
	}
	return r, nil
}

// Banner renders the generated-code header line.
func (r *Renderer) Banner() (string, error) {
	return r.banner.Render(NoData{})
}

// PbImports renders the type-only and schema imports of a protobuf module.
func (r *Renderer) PbImports(data PbImportsData) (string, error) {
	return r.pbImports.Render(data)
}

// DocComment renders a JSDoc block.
func (r *Renderer) DocComment(data DocCommentData) (string, error) {
	return r.docComment.Render(data)
}

// ServiceDefinition renders the whole <proto>_service.ts file.
func (r *Renderer) ServiceDefinition(data ServiceDefinitionData) (string, error) {
	return r.serviceDefinition.Render(data)
}

// ClientMethod renders one method of a service client class.
func (r *Renderer) ClientMethod(data ClientMethodData) (string, error) {
	return r.clientMethod.Render(data)
}

// ServiceClient renders the whole <proto>_client.ts file.
func (r *Renderer) ServiceClient(data ServiceClientData) (string, error) {
	return r.serviceClient.Render(data)
}

// WrapperClient renders the whole client.ts file.
func (r *Renderer) WrapperClient(data WrapperClientData) (string, error) {
	return r.wrapperClient.Render(data)
}

// Index renders the whole index.ts file.
func (r *Renderer) Index(data IndexData) (string, error) {
	return r.index.Render(data)
}

// bind looks up the template called name and stores the typed block in target.
func bind[D any](templates *template.Template, name string, target *block[D]) error {
	bound, err := newBlock[D](templates, name)
	if err != nil {
		return err
	}
	*target = bound
	return nil
}
