package model

import "strings"

// Comment is the leading comment of a proto element as protogen exposes it.
type Comment string

// Lines returns the comment as trimmed lines with any leading "//" removed,
// or nil when the comment is blank.
func (c Comment) Lines() []string {
	trimmed := strings.TrimSpace(string(c))
	if trimmed == "" {
		return nil
	}
	raw := strings.Split(trimmed, "\n")
	lines := make([]string, 0, len(raw))
	for _, line := range raw {
		lines = append(lines, strings.TrimPrefix(strings.TrimSpace(line), "//"))
	}
	return lines
}
