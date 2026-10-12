package model

import (
	"reflect"
	"testing"
)

// These cases pin how proto comments become TypeScript doc lines: a blank
// comment must select the fallback text, and every line keeps its position.
func TestCommentLines(t *testing.T) {
	cases := []struct {
		name    string
		comment Comment
		want    []string
	}{
		{"empty", "", nil},
		{"whitespace_only", " \n\t\n", nil},
		{"single_line", " Lists domains.\n", []string{"Lists domains."}},
		{"multi_line", " First.\n Second.\n", []string{"First.", "Second."}},
		{"inner_blank_line_is_kept", " First.\n\n Last.\n", []string{"First.", "", "Last."}},
		{"slash_prefix_is_removed", "// Quoted.\n", []string{" Quoted."}},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.comment.Lines()
			if !reflect.DeepEqual(got, tc.want) {
				t.Fatalf("Lines() = %#v, want %#v", got, tc.want)
			}
		})
	}
}
