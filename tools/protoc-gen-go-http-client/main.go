package main

import (
	"fmt"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
	"tools/protoc-gen-go-http-client/internal/generate"
	"tools/protoc-gen-go-http-client/internal/model"
	"tools/protoc-gen-go-http-client/internal/render"
)

func main() {
	configLoader := model.NewConfigLoader()
	protogen.Options{ParamFunc: configLoader.Set}.Run(func(plugin *protogen.Plugin) error {
		plugin.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)

		cfg := configLoader.Config()

		// Initialize template renderer.
		renderer, err := render.NewRenderer()
		if err != nil {
			return fmt.Errorf("initialize renderer: %w", err)
		}

		// Create generator and generate code based on client mode.
		gen := generate.NewGenerator(plugin, cfg, renderer)
		if cfg.ClientMode == "external" {
			if err := gen.GenerateExternalClient(); err != nil {
				return fmt.Errorf("generate external client: %w", err)
			}
		} else {
			if err := gen.GeneratePerFileClients(); err != nil {
				return fmt.Errorf("generate per-file clients: %w", err)
			}
		}

		return nil
	})
}
