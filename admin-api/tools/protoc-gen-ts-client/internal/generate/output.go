package generate

import "admin-api/tools/protoc-gen-ts-client/internal/model"

// Output is one generated file: its path relative to the output root and its full text.
type Output struct {
	Filename string
	Content  string
}

// FileOutputs is everything generated for one proto file: its files and the
// clients the wrapper client and the index must reference.
type FileOutputs struct {
	Files    []Output
	Services []model.ServiceRef
}
