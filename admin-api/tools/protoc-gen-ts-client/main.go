package main

import (
	"fmt"
	"os"

	"google.golang.org/protobuf/compiler/protogen"

	"admin-api/tools/protoc-gen-ts-client/internal/config"
	"admin-api/tools/protoc-gen-ts-client/internal/generate"
	"admin-api/tools/protoc-gen-ts-client/internal/naming"
	"admin-api/tools/protoc-gen-ts-client/internal/plugin"
	"admin-api/tools/protoc-gen-ts-client/internal/render"
	"admin-api/tools/protoc-gen-ts-client/internal/source"
)

func main() {
	cfg := config.NewConfig()
	renderer, err := render.NewRenderer()
	if err != nil {
		fmt.Fprintln(os.Stderr, "protoc-gen-ts-client:", err)
		os.Exit(1)
	}
	generator := generate.NewGenerator(renderer, naming.NewNaming(), cfg)
	tsPlugin := plugin.NewPlugin(source.NewReader(), generator)

	protogen.Options{ParamFunc: cfg.Set}.Run(tsPlugin.Run)
}
