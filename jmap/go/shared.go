package jmapsdk

import "encoding/json"

// PatchObject is a JMAP patch map (JSON Pointer keys → values).
type PatchObject = map[string]any

// ResultReference is a JMAP result reference used in generated args structs.
// For hand-written call sites use ResultRef (from refs.go) and the Ref helper.
type ResultReference struct {
	ResultOf string `json:"resultOf"`
	Name     string `json:"name"`
	Path     string `json:"path"`
}

// StringOrRef holds either a concrete string slice or a JMAP result reference.
// A zero value is treated as an empty ID list.
//
// Construct via [StringIDs] for a literal list, or [Ref] for a result reference.
type StringOrRef struct {
	ids []string
	ref *ResultRef
}

// StringIDs constructs a [StringOrRef] from a concrete list of IDs.
func StringIDs(ids ...string) StringOrRef {
	return StringOrRef{ids: ids}
}

// isRef reports whether the value holds a result reference.
func (s StringOrRef) isRef() bool { return s.ref != nil }

// MarshalJSON serialises the value as a JSON array of strings when it holds
// an ID list, or as a JMAP result-reference object when it holds a ref.
// marshalArgs in batch.go intercepts result-ref fields before this is called
// (to rename the JSON key), so this method exists primarily as a safety net.
func (s StringOrRef) MarshalJSON() ([]byte, error) {
	if s.ref != nil {
		return json.Marshal(s.ref)
	}
	if s.ids == nil {
		return []byte("null"), nil
	}
	return json.Marshal(s.ids)
}
