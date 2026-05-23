package jmapsdk

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

// JMAPSessionAccount describes a single JMAP account in the session resource.
type JMAPSessionAccount struct {
	Name                string                 `json:"name"`
	IsPersonal          bool                   `json:"isPersonal"`
	IsReadOnly          bool                   `json:"isReadOnly"`
	AccountCapabilities map[string]any `json:"accountCapabilities"`
}

// JMAPSession is the parsed JMAP session resource returned by /.well-known/jmap.
type JMAPSession struct {
	Capabilities    map[string]any        `json:"capabilities"`
	Accounts        map[string]JMAPSessionAccount `json:"accounts"`
	PrimaryAccounts map[string]string             `json:"primaryAccounts"`
	Username        string                        `json:"username"`
	APIUrl          string                        `json:"apiUrl"`
	DownloadUrl     string                        `json:"downloadUrl,omitempty"`
	UploadUrl       string                        `json:"uploadUrl,omitempty"`
	EventSourceUrl  string                        `json:"eventSourceUrl,omitempty"`
	State           string                        `json:"state"`
}

// GetSession fetches and parses the JMAP session from baseURL + "/.well-known/jmap".
// The authorization parameter is sent as the Authorization header value
// (e.g. "Bearer <token>").
func GetSession(ctx context.Context, baseURL, authorization string) (*JMAPSession, error) {
	url := strings.TrimRight(baseURL, "/") + "/.well-known/jmap"

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("jmapsdk: build session request: %w", err)
	}
	req.Header.Set("Accept", "application/json")
	if authorization != "" {
		req.Header.Set("Authorization", authorization)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("jmapsdk: session HTTP request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		text, _ := io.ReadAll(io.LimitReader(resp.Body, 4096))
		return nil, fmt.Errorf("jmapsdk: session HTTP %d: %s", resp.StatusCode, string(text))
	}

	var session JMAPSession
	if err := json.NewDecoder(resp.Body).Decode(&session); err != nil {
		return nil, fmt.Errorf("jmapsdk: decode session: %w", err)
	}
	return &session, nil
}
