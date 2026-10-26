package config

import "fmt"

// HandlerContextModuleParameter is the plugin parameter that names the module
// the generated service files import HandlerContext from.
const HandlerContextModuleParameter = "handler_context_module"

// Config holds the plugin's own parameters. protogen consumes its standard
// parameters (paths, module, annotate_code) itself; every parameter other than
// handler_context_module is rejected by Set.
type Config struct {
	// HandlerContextModule is the module specifier the generated *_service.ts
	// files import HandlerContext from. Empty when the parameter is not given;
	// no *_service.ts file is generated then.
	HandlerContextModule string
}

// NewConfig returns the plugin configuration with all defaults.
func NewConfig() *Config {
	return &Config{}
}

// Set receives each parameter protogen does not consume and rejects the unknown ones.
func (c *Config) Set(name, value string) error {
	if name != HandlerContextModuleParameter {
		return fmt.Errorf("unknown parameter %q (value %q): protoc-gen-ts-client accepts only %s and the protogen parameters paths, module and annotate_code", name, value, HandlerContextModuleParameter)
	}
	if value == "" {
		return fmt.Errorf("parameter %q needs a module specifier as its value", name)
	}
	c.HandlerContextModule = value
	return nil
}
