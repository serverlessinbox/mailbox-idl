package jmapsdk

// ResultRef is a JMAP result reference (RFC 8620 §3.7).
// It refers to a property in the response of a previous method call in the
// same request. The Batch builder serialises result-ref fields with a "#"
// prefix on the JSON key.
type ResultRef struct {
	ResultOf string `json:"resultOf"`
	Name     string `json:"name"`
	Path     string `json:"path"`
}

// Ref builds a [StringOrRef] that carries a result reference from a
// [BatchHandle] and a JSON Pointer path.
//
// Assign the return value to any result-ref-capable field (type [StringOrRef])
// in an args struct.
//
// Example:
//
//	IDs: jmapsdk.Ref(queryHandle, "/ids")
func Ref[T any](h BatchHandle[T], path string) StringOrRef {
	return StringOrRef{ref: &ResultRef{
		ResultOf: h.callID,
		Name:     h.methodName,
		Path:     path,
	}}
}
