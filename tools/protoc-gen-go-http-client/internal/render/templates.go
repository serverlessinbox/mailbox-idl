package render

import (
	"bytes"
	"embed"
	"fmt"
	"text/template"
)

// FS embeds the templates.
//
//go:embed templates.tmpl
var FS embed.FS

// Renderer provides typed rendering methods for each template block.
type Renderer struct {
	tmpl *template.Template
}

// NewRenderer parses the embedded templates and returns a ready-to-use Renderer.
func NewRenderer() (*Renderer, error) {
	tmpl, err := template.ParseFS(FS, "templates.tmpl")
	if err != nil {
		return nil, fmt.Errorf("parse templates: %w", err)
	}
	return &Renderer{tmpl: tmpl}, nil
}

// ExternalFileHeaderData holds data for rendering the external file header.
type ExternalFileHeaderData struct {
	PackageName string
}

// RenderExternalFileHeader renders the external file header.
func (r *Renderer) RenderExternalFileHeader(data ExternalFileHeaderData) (string, error) {
	return r.render("external_file_header", data)
}

// FileHeaderData holds data for rendering a file header.
type FileHeaderData struct {
	SourcePath  string
	PackageName string
}

// RenderFileHeader renders a file header.
func (r *Renderer) RenderFileHeader(data FileHeaderData) (string, error) {
	return r.render("file_header", data)
}

// RenderSharedHelpers renders the shared helper functions and types.
func (r *Renderer) RenderSharedHelpers() (string, error) {
	return r.render("shared_helpers", nil)
}

// MethodData holds data for a service method.
type MethodData struct {
	MethodName string
	InputType  string
	OutputType string
	ClientName string
}

// ServiceClientData holds data for rendering a service client.
type ServiceClientData struct {
	ClientName       string
	ServiceInterface string
	ServicePath      string
	Methods          []MethodData
}

// RenderServiceClient renders a service client.
func (r *Renderer) RenderServiceClient(data ServiceClientData) (string, error) {
	return r.render("service_client", data)
}

// ServiceFieldData holds data for a service in a compound client.
type ServiceFieldData struct {
	FieldName  string
	ClientName string
}

// CompoundClientData holds data for rendering a compound client.
type CompoundClientData struct {
	PackageName string
	Services    []ServiceFieldData
}

// RenderCompoundClient renders a compound client.
func (r *Renderer) RenderCompoundClient(data CompoundClientData) (string, error) {
	return r.render("compound_client", data)
}

// render is a helper that executes a template and returns its output as a string.
func (r *Renderer) render(templateName string, data interface{}) (string, error) {
	var buf bytes.Buffer
	if err := r.tmpl.ExecuteTemplate(&buf, templateName, data); err != nil {
		return "", fmt.Errorf("render %s: %w", templateName, err)
	}
	return buf.String(), nil
}
