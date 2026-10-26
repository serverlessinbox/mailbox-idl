package model

import (
	"fmt"
	"strconv"
)

const (
	paramClientMode             = "client_mode"
	paramClientPackage          = "client_package"
	paramClientFilename         = "client_filename"
	paramCompoundClient         = "compound_client"
	paramCompoundClientFilename = "compound_client_filename"
)

const (
	defaultClientPackage          = "adminclient"
	defaultClientFilename         = "admin_api_http_client.pb.go"
	defaultCompoundClientFilename = "admin_api_client.pb.go"
)

// Config holds the parsed plugin parameters.
type Config struct {
	ClientMode             string
	ClientPackage          string
	ClientFilename         string
	CompoundClient         bool
	CompoundClientFilename string
}

// ConfigLoader collects the plugin's own parameters as protogen reports them.
// protogen consumes its standard parameters (module, paths, annotate_code,
// M<file>=<path>) itself, so only the plugin's own parameters reach Set.
type ConfigLoader struct {
	cfg Config
}

// NewConfigLoader returns a loader with no parameters set.
func NewConfigLoader() *ConfigLoader {
	return &ConfigLoader{cfg: Config{}}
}

// Set records one plugin parameter. Its signature is the protogen.Options
// ParamFunc contract: an error aborts the plugin run.
func (l *ConfigLoader) Set(name, value string) error {
	switch name {
	case paramClientMode:
		l.cfg.ClientMode = value
	case paramClientPackage:
		l.cfg.ClientPackage = value
	case paramClientFilename:
		l.cfg.ClientFilename = value
	case paramCompoundClient:
		enabled, err := strconv.ParseBool(value)
		if err != nil {
			return fmt.Errorf("parameter %s: %q is not a boolean", paramCompoundClient, value)
		}
		l.cfg.CompoundClient = enabled
	case paramCompoundClientFilename:
		l.cfg.CompoundClientFilename = value
	default:
		return fmt.Errorf("unknown parameter %q", name)
	}
	return nil
}

// Config returns the collected parameters with defaults applied to every
// filename and the package name left unset.
func (l *ConfigLoader) Config() *Config {
	cfg := l.cfg
	if cfg.ClientPackage == "" {
		cfg.ClientPackage = defaultClientPackage
	}
	if cfg.ClientFilename == "" {
		cfg.ClientFilename = defaultClientFilename
	}
	if cfg.CompoundClientFilename == "" {
		cfg.CompoundClientFilename = defaultCompoundClientFilename
	}
	return &cfg
}
