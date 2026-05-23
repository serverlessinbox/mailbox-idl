package jmapsdk

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// JMAPRequest is the body of a JMAP API request (RFC 8620 §3.3).
type JMAPRequest struct {
	Using       []string     `json:"using"`
	MethodCalls []MethodCall `json:"methodCalls"`
}

// JMAPResponse is the body of a JMAP API response (RFC 8620 §3.4).
type JMAPResponse struct {
	SessionState    string       `json:"sessionState"`
	MethodResponses []MethodCall `json:"methodResponses"`
}

// MethodCall represents a single JMAP method call or response triple
// [name, args, callId]. It marshals/unmarshals as a JSON array.
type MethodCall struct {
	Name   string
	Args   json.RawMessage
	CallID string
}

// MarshalJSON encodes MethodCall as the JMAP wire format: [name, args, callId].
func (m MethodCall) MarshalJSON() ([]byte, error) {
	arr := [3]json.RawMessage{}
	name, err := json.Marshal(m.Name)
	if err != nil {
		return nil, fmt.Errorf("jmapsdk: marshal MethodCall.Name: %w", err)
	}
	arr[0] = name

	if m.Args == nil {
		arr[1] = json.RawMessage("null")
	} else {
		arr[1] = m.Args
	}

	callID, err := json.Marshal(m.CallID)
	if err != nil {
		return nil, fmt.Errorf("jmapsdk: marshal MethodCall.CallID: %w", err)
	}
	arr[2] = callID

	return json.Marshal(arr)
}

// UnmarshalJSON decodes MethodCall from the JMAP wire format: [name, args, callId].
func (m *MethodCall) UnmarshalJSON(data []byte) error {
	var arr [3]json.RawMessage
	if err := json.Unmarshal(data, &arr); err != nil {
		return fmt.Errorf("jmapsdk: unmarshal MethodCall array: %w", err)
	}
	if err := json.Unmarshal(arr[0], &m.Name); err != nil {
		return fmt.Errorf("jmapsdk: unmarshal MethodCall.Name: %w", err)
	}
	m.Args = arr[1]
	if err := json.Unmarshal(arr[2], &m.CallID); err != nil {
		return fmt.Errorf("jmapsdk: unmarshal MethodCall.CallID: %w", err)
	}
	return nil
}

// Client is the JMAP transport interface. Implementations must be safe for
// concurrent use.
type Client interface {
	Do(ctx context.Context, req *JMAPRequest) (*JMAPResponse, error)
}

type httpClient struct {
	apiURL        string
	authorization string
	http          *http.Client
}

// NewHTTPClient returns a Client that posts to apiURL using the given
// authorization header value (e.g. "Bearer <token>").
func NewHTTPClient(apiURL, authorization string) Client {
	return &httpClient{
		apiURL:        apiURL,
		authorization: authorization,
		http:          &http.Client{},
	}
}

func (c *httpClient) Do(ctx context.Context, req *JMAPRequest) (*JMAPResponse, error) {
	body, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("jmapsdk: marshal request: %w", err)
	}

	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, c.apiURL, bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("jmapsdk: build HTTP request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")
	if c.authorization != "" {
		httpReq.Header.Set("Authorization", c.authorization)
	}

	resp, err := c.http.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("jmapsdk: HTTP request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		text, _ := io.ReadAll(io.LimitReader(resp.Body, 4096))
		return nil, fmt.Errorf("jmapsdk: HTTP %d: %s", resp.StatusCode, string(text))
	}

	var jmapResp JMAPResponse
	if err := json.NewDecoder(resp.Body).Decode(&jmapResp); err != nil {
		return nil, fmt.Errorf("jmapsdk: decode response: %w", err)
	}
	return &jmapResp, nil
}
