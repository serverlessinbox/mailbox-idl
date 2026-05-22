// Code generated from mailbox-idl/jmap manifest. DO NOT EDIT.

package jmapsdk

import (
	"context"
	"encoding/json"
	"fmt"
)

// TypedClient wraps a raw Client and exposes one strongly-typed method per JMAP method.
type TypedClient struct{ c Client }

// NewTypedClient creates a TypedClient wrapping the given Client.
func NewTypedClient(c Client) *TypedClient { return &TypedClient{c: c} }

// MailboxGet executes a single Mailbox/get call and returns the parsed response.
func (tc *TypedClient) MailboxGet(ctx context.Context, args MailboxGetArgs) (*MailboxGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Mailbox/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Mailbox/get") }
	var result MailboxGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// MailboxChanges executes a single Mailbox/changes call and returns the parsed response.
func (tc *TypedClient) MailboxChanges(ctx context.Context, args MailboxChangesArgs) (*MailboxChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Mailbox/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Mailbox/changes") }
	var result MailboxChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailGet executes a single Email/get call and returns the parsed response.
func (tc *TypedClient) EmailGet(ctx context.Context, args EmailGetArgs) (*EmailGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/get") }
	var result EmailGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailChanges executes a single Email/changes call and returns the parsed response.
func (tc *TypedClient) EmailChanges(ctx context.Context, args EmailChangesArgs) (*EmailChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/changes") }
	var result EmailChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailQuery executes a single Email/query call and returns the parsed response.
func (tc *TypedClient) EmailQuery(ctx context.Context, args EmailQueryArgs) (*EmailQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/query") }
	var result EmailQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailQueryChanges executes a single Email/queryChanges call and returns the parsed response.
func (tc *TypedClient) EmailQueryChanges(ctx context.Context, args EmailQueryChangesArgs) (*EmailQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/queryChanges") }
	var result EmailQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailSet executes a single Email/set call and returns the parsed response.
func (tc *TypedClient) EmailSet(ctx context.Context, args EmailSetArgs) (*EmailSetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/set") }
	var result EmailSetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ThreadGet executes a single Thread/get call and returns the parsed response.
func (tc *TypedClient) ThreadGet(ctx context.Context, args ThreadGetArgs) (*ThreadGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Thread/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Thread/get") }
	var result ThreadGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// MailboxSet executes a single Mailbox/set call and returns the parsed response.
func (tc *TypedClient) MailboxSet(ctx context.Context, args MailboxSetArgs) (*MailboxSetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Mailbox/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Mailbox/set") }
	var result MailboxSetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// MailboxQuery executes a single Mailbox/query call and returns the parsed response.
func (tc *TypedClient) MailboxQuery(ctx context.Context, args MailboxQueryArgs) (*MailboxQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Mailbox/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Mailbox/query") }
	var result MailboxQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailImport executes a single Email/import call and returns the parsed response.
func (tc *TypedClient) EmailImport(ctx context.Context, args EmailImportArgs) (*EmailImportResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/import", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/import") }
	var result EmailImportResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailCopy executes a single Email/copy call and returns the parsed response.
func (tc *TypedClient) EmailCopy(ctx context.Context, args EmailCopyArgs) (*EmailCopyResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/copy", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/copy") }
	var result EmailCopyResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailParse executes a single Email/parse call and returns the parsed response.
func (tc *TypedClient) EmailParse(ctx context.Context, args EmailParseArgs) (*EmailParseResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Email/parse", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Email/parse") }
	var result EmailParseResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ThreadQuery executes a single Thread/query call and returns the parsed response.
func (tc *TypedClient) ThreadQuery(ctx context.Context, args ThreadQueryArgs) (*ThreadQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Thread/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Thread/query") }
	var result ThreadQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ThreadChanges executes a single Thread/changes call and returns the parsed response.
func (tc *TypedClient) ThreadChanges(ctx context.Context, args ThreadChangesArgs) (*ThreadChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Thread/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Thread/changes") }
	var result ThreadChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailSubmissionGet executes a single EmailSubmission/get call and returns the parsed response.
func (tc *TypedClient) EmailSubmissionGet(ctx context.Context, args EmailSubmissionGetArgs) (*EmailSubmissionGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("EmailSubmission/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for EmailSubmission/get") }
	var result EmailSubmissionGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailSubmissionSet executes a single EmailSubmission/set call and returns the parsed response.
func (tc *TypedClient) EmailSubmissionSet(ctx context.Context, args EmailSubmissionSetArgs) (*EmailSubmissionSetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("EmailSubmission/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for EmailSubmission/set") }
	var result EmailSubmissionSetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailSubmissionQuery executes a single EmailSubmission/query call and returns the parsed response.
func (tc *TypedClient) EmailSubmissionQuery(ctx context.Context, args EmailSubmissionQueryArgs) (*EmailSubmissionQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("EmailSubmission/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for EmailSubmission/query") }
	var result EmailSubmissionQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailSubmissionQueryChanges executes a single EmailSubmission/queryChanges call and returns the parsed response.
func (tc *TypedClient) EmailSubmissionQueryChanges(ctx context.Context, args EmailSubmissionQueryChangesArgs) (*EmailSubmissionQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("EmailSubmission/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for EmailSubmission/queryChanges") }
	var result EmailSubmissionQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// EmailSubmissionChanges executes a single EmailSubmission/changes call and returns the parsed response.
func (tc *TypedClient) EmailSubmissionChanges(ctx context.Context, args EmailSubmissionChangesArgs) (*EmailSubmissionChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("EmailSubmission/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for EmailSubmission/changes") }
	var result EmailSubmissionChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// IdentityGet executes a single Identity/get call and returns the parsed response.
func (tc *TypedClient) IdentityGet(ctx context.Context, args IdentityGetArgs) (*IdentityGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("Identity/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Identity/get") }
	var result IdentityGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// IdentitySet executes a single Identity/set call and returns the parsed response.
func (tc *TypedClient) IdentitySet(ctx context.Context, args IdentitySetArgs) (*IdentitySetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("Identity/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Identity/set") }
	var result IdentitySetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// IdentityChanges executes a single Identity/changes call and returns the parsed response.
func (tc *TypedClient) IdentityChanges(ctx context.Context, args IdentityChangesArgs) (*IdentityChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:submission")
	b.Add("Identity/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Identity/changes") }
	var result IdentityChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// MailboxQueryChanges executes a single Mailbox/queryChanges call and returns the parsed response.
func (tc *TypedClient) MailboxQueryChanges(ctx context.Context, args MailboxQueryChangesArgs) (*MailboxQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Mailbox/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Mailbox/queryChanges") }
	var result MailboxQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ThreadQueryChanges executes a single Thread/queryChanges call and returns the parsed response.
func (tc *TypedClient) ThreadQueryChanges(ctx context.Context, args ThreadQueryChangesArgs) (*ThreadQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:mail")
	b.Add("Thread/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Thread/queryChanges") }
	var result ThreadQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// AddressBookGet executes a single AddressBook/get call and returns the parsed response.
func (tc *TypedClient) AddressBookGet(ctx context.Context, args AddressBookGetArgs) (*AddressBookGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("AddressBook/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for AddressBook/get") }
	var result AddressBookGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// AddressBookSet executes a single AddressBook/set call and returns the parsed response.
func (tc *TypedClient) AddressBookSet(ctx context.Context, args AddressBookSetArgs) (*AddressBookSetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("AddressBook/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for AddressBook/set") }
	var result AddressBookSetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// AddressBookQuery executes a single AddressBook/query call and returns the parsed response.
func (tc *TypedClient) AddressBookQuery(ctx context.Context, args AddressBookQueryArgs) (*AddressBookQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("AddressBook/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for AddressBook/query") }
	var result AddressBookQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// AddressBookQueryChanges executes a single AddressBook/queryChanges call and returns the parsed response.
func (tc *TypedClient) AddressBookQueryChanges(ctx context.Context, args AddressBookQueryChangesArgs) (*AddressBookQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("AddressBook/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for AddressBook/queryChanges") }
	var result AddressBookQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// AddressBookChanges executes a single AddressBook/changes call and returns the parsed response.
func (tc *TypedClient) AddressBookChanges(ctx context.Context, args AddressBookChangesArgs) (*AddressBookChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("AddressBook/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for AddressBook/changes") }
	var result AddressBookChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ContactCardGet executes a single ContactCard/get call and returns the parsed response.
func (tc *TypedClient) ContactCardGet(ctx context.Context, args ContactCardGetArgs) (*ContactCardGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("ContactCard/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ContactCard/get") }
	var result ContactCardGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ContactCardSet executes a single ContactCard/set call and returns the parsed response.
func (tc *TypedClient) ContactCardSet(ctx context.Context, args ContactCardSetArgs) (*ContactCardSetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("ContactCard/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ContactCard/set") }
	var result ContactCardSetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ContactCardQuery executes a single ContactCard/query call and returns the parsed response.
func (tc *TypedClient) ContactCardQuery(ctx context.Context, args ContactCardQueryArgs) (*ContactCardQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("ContactCard/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ContactCard/query") }
	var result ContactCardQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ContactCardQueryChanges executes a single ContactCard/queryChanges call and returns the parsed response.
func (tc *TypedClient) ContactCardQueryChanges(ctx context.Context, args ContactCardQueryChangesArgs) (*ContactCardQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("ContactCard/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ContactCard/queryChanges") }
	var result ContactCardQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ContactCardChanges executes a single ContactCard/changes call and returns the parsed response.
func (tc *TypedClient) ContactCardChanges(ctx context.Context, args ContactCardChangesArgs) (*ContactCardChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("ContactCard/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ContactCard/changes") }
	var result ContactCardChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ContactCardCopy executes a single ContactCard/copy call and returns the parsed response.
func (tc *TypedClient) ContactCardCopy(ctx context.Context, args ContactCardCopyArgs) (*ContactCardCopyResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:contacts")
	b.Add("ContactCard/copy", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ContactCard/copy") }
	var result ContactCardCopyResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// PrincipalGet executes a single Principal/get call and returns the parsed response.
func (tc *TypedClient) PrincipalGet(ctx context.Context, args PrincipalGetArgs) (*PrincipalGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("Principal/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Principal/get") }
	var result PrincipalGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// PrincipalSet executes a single Principal/set call and returns the parsed response.
func (tc *TypedClient) PrincipalSet(ctx context.Context, args PrincipalSetArgs) (*PrincipalSetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("Principal/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Principal/set") }
	var result PrincipalSetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// PrincipalQuery executes a single Principal/query call and returns the parsed response.
func (tc *TypedClient) PrincipalQuery(ctx context.Context, args PrincipalQueryArgs) (*PrincipalQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("Principal/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Principal/query") }
	var result PrincipalQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// PrincipalQueryChanges executes a single Principal/queryChanges call and returns the parsed response.
func (tc *TypedClient) PrincipalQueryChanges(ctx context.Context, args PrincipalQueryChangesArgs) (*PrincipalQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("Principal/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Principal/queryChanges") }
	var result PrincipalQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// PrincipalChanges executes a single Principal/changes call and returns the parsed response.
func (tc *TypedClient) PrincipalChanges(ctx context.Context, args PrincipalChangesArgs) (*PrincipalChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("Principal/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for Principal/changes") }
	var result PrincipalChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ShareNotificationGet executes a single ShareNotification/get call and returns the parsed response.
func (tc *TypedClient) ShareNotificationGet(ctx context.Context, args ShareNotificationGetArgs) (*ShareNotificationGetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("ShareNotification/get", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ShareNotification/get") }
	var result ShareNotificationGetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ShareNotificationSet executes a single ShareNotification/set call and returns the parsed response.
func (tc *TypedClient) ShareNotificationSet(ctx context.Context, args ShareNotificationSetArgs) (*ShareNotificationSetResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("ShareNotification/set", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ShareNotification/set") }
	var result ShareNotificationSetResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ShareNotificationQuery executes a single ShareNotification/query call and returns the parsed response.
func (tc *TypedClient) ShareNotificationQuery(ctx context.Context, args ShareNotificationQueryArgs) (*ShareNotificationQueryResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("ShareNotification/query", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ShareNotification/query") }
	var result ShareNotificationQueryResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ShareNotificationQueryChanges executes a single ShareNotification/queryChanges call and returns the parsed response.
func (tc *TypedClient) ShareNotificationQueryChanges(ctx context.Context, args ShareNotificationQueryChangesArgs) (*ShareNotificationQueryChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("ShareNotification/queryChanges", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ShareNotification/queryChanges") }
	var result ShareNotificationQueryChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}

// ShareNotificationChanges executes a single ShareNotification/changes call and returns the parsed response.
func (tc *TypedClient) ShareNotificationChanges(ctx context.Context, args ShareNotificationChangesArgs) (*ShareNotificationChangesResponse, error) {
	b := NewBatch("urn:ietf:params:jmap:principals")
	b.Add("ShareNotification/changes", args)
	resp, err := tc.c.Do(ctx, b.Request())
	if err != nil { return nil, err }
	if len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ShareNotification/changes") }
	var result ShareNotificationChangesResponse
	if err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }
	return &result, nil
}
