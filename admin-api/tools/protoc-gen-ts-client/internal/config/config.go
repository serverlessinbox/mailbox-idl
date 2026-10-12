package config

import "fmt"

// Config holds the plugin's own parameters. The plugin defines none today:
// protogen consumes its standard parameters (paths, module, annotate_code)
// itself, and every other parameter is rejected by Set.
type Config struct{}

// NewConfig returns the plugin configuration with all defaults.
func NewConfig() *Config {
	return &Config{}
}

// Set receives each parameter protogen does not consume and rejects it as unknown.
func (c *Config) Set(name, value string) error {
	return fmt.Errorf("unknown parameter %q (value %q): protoc-gen-ts-client accepts only the protogen parameters paths, module and annotate_code", name, value)
}
