package render

import (
	_ "embed"
	"strings"
	"text/template"

	"admin-api/tools/protoc-gen-go-interface/internal/model"
)

//go:embed templates.tmpl
var templatesFS string

var tmpl = template.Must(template.New("templates").Parse(templatesFS))

// File renders the interface file template with the given data.
func File(data *model.FileData) (string, error) {
	var out strings.Builder
	if err := tmpl.ExecuteTemplate(&out, "file", data); err != nil {
		return "", err
	}
	return out.String(), nil
}
