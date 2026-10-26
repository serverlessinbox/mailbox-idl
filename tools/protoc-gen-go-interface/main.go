package main

import (
	"flag"

	"google.golang.org/protobuf/compiler/protogen"
	pluginpb "google.golang.org/protobuf/types/pluginpb"

	"tools/protoc-gen-go-interface/internal/gen"
)

func main() {
	var flags flag.FlagSet

	protogen.Options{
		ParamFunc: flags.Set,
	}.Run(func(plugin *protogen.Plugin) error {
		plugin.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)

		// Create generator and process files
		generator := gen.NewGenerator()

		for _, file := range plugin.Files {
			if !file.Generate {
				continue
			}

			if err := generator.GenerateFile(plugin, file); err != nil {
				return err
			}
		}

		return nil
	})
}
