package render

import (
	"bytes"
	"fmt"
	"text/template"
)

// block is one named template of the parsed template set, bound to the single
// data type it renders.
type block[D any] struct {
	templates *template.Template
	name      string
}

// newBlock binds the template called name, failing when the template set does not define it.
func newBlock[D any](templates *template.Template, name string) (block[D], error) {
	if templates.Lookup(name) == nil {
		return block[D]{}, fmt.Errorf("template block %q is not defined", name)
	}
	return block[D]{templates: templates, name: name}, nil
}

// Render executes the block with data and returns the text it produced.
func (b block[D]) Render(data D) (string, error) {
	var out bytes.Buffer
	if err := b.templates.ExecuteTemplate(&out, b.name, data); err != nil {
		return "", fmt.Errorf("rendering block %q: %w", b.name, err)
	}
	return out.String(), nil
}
