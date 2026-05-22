package jmapsdk

// PatchObject is a JMAP patch map (JSON Pointer keys → values).
type PatchObject = map[string]interface{}

// ResultReference is a JMAP result reference used in generated args structs.
// For hand-written call sites use ResultRef (from refs.go) and the Ref helper.
type ResultReference struct {
	ResultOf string `json:"resultOf"`
	Name     string `json:"name"`
	Path     string `json:"path"`
}
