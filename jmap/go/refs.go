package jmapsdk

// ResultRef is a JMAP result reference (RFC 8620 §3.7).
// It refers to a property in the response of a previous method call in the
// same request. When assigned to a result-ref-capable field (typed as `any`),
// the Batch builder serializes it with a "#" prefix on the JSON key.
type ResultRef struct {
	ResultOf string `json:"resultOf"`
	Name     string `json:"name"`
	Path     string `json:"path"`
}

// Ref builds a ResultRef from a BatchHandle and a JSON Pointer path.
// Assign the return value to any result-ref-capable field (type any) in an
// args struct.
//
// Example:
//
//	IDs: jmapsdk.Ref(queryHandle, "/ids")
func Ref[T any](h BatchHandle[T], path string) *ResultRef {
	return &ResultRef{
		ResultOf: h.callID,
		Name:     h.methodName,
		Path:     path,
	}
}
