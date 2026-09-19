# ServerlessInbox IDL

> **Part of [ServerlessInbox](https://github.com/serverlessinbox/serverlessinbox)**: a serverless JMAP email server that runs in your own AWS account.
> Issues and questions go to the [main repo](https://github.com/serverlessinbox/serverlessinbox/issues) · [Docs](https://docs.serverlessinbox.com)

The API contracts of ServerlessInbox, in machine-readable form. Every API is defined here first, and the code on both sides is generated from these definitions, so clients and server can't drift apart.

## What's in here

| Folder | Contract | Format |
|---|---|---|
| [`jmap/`](jmap) | The JMAP API: method arguments, responses and data types, plus [`manifest.yaml`](jmap/manifest.yaml), which lists every supported method, its capability and its result-reference wiring | JSON Schema |
| [`admin-api/`](admin-api) | The Admin API: domains, users, aliases, identities, monitoring, audit, suppression and more | Protocol Buffers ([buf](https://buf.build)) |
| [`push-ws/`](push-ws) | Real-time push events over WebSocket | Protocol Buffers |

### JMAP standards covered

| Capability | Specification |
|---|---|
| `urn:ietf:params:jmap:core` | [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620): JMAP core |
| `urn:ietf:params:jmap:mail`, `…:submission` | [RFC 8621](https://www.rfc-editor.org/rfc/rfc8621): JMAP for Mail |
| `urn:ietf:params:jmap:contacts` | [RFC 9610](https://www.rfc-editor.org/rfc/rfc9610): JMAP for Contacts |
| `urn:ietf:params:jmap:principals` | [RFC 9670](https://www.rfc-editor.org/rfc/rfc9670): JMAP Sharing |

ServerlessInbox adds two extensions. Each capability URI is also the address of its specification on [specs.serverlessinbox.com](https://specs.serverlessinbox.com):

- [`https://specs.serverlessinbox.com/page-token`](https://specs.serverlessinbox.com/page-token): cursor-based pagination for `*/query`, for backends that cannot page by index.
- [`https://specs.serverlessinbox.com/websocket`](https://specs.serverlessinbox.com/websocket): WebSocket push.

`manifest.yaml` is the authoritative list of supported methods.

## Generating code

This repo contains **definitions only, never generated code**. Each consumer generates into its own source tree and chooses where the output goes with `OUTPUT_DIR`.

**Prerequisites:** [Task](https://taskfile.dev), Node.js 22 with Corepack (Yarn 4), Go 1.25+, and [buf](https://buf.build/docs/installation).

```bash
# JMAP: TypeScript types and validators
task jmap:generate:ts OUTPUT_DIR=/path/to/your/project/src/jmap

# JMAP: complete Go SDK (types, typed client and batch builder), gofmt-formatted
task jmap:generate:go OUTPUT_DIR=/path/to/your/go/module/jmapsdk PACKAGE=jmapsdk

# Admin API: TypeScript client
task admin-api:generate:ts OUTPUT_DIR=/path/to/your/project/src/admin-api

# Admin API: Go types and interfaces
task admin-api:generate:go \
  OUTPUT_DIR=/path/to/your/go/module \
  GO_PACKAGE_PREFIX=myprefix/generated \
  GO_MODULE_TRIM=myprefix

# Admin API: Go HTTP client
task admin-api:generate:go:http-client OUTPUT_DIR=/path/to/your/go/module

# Push WebSocket events: TypeScript
task push-ws:generate:ts OUTPUT_DIR=/path/to/your/project/src/push

# Push WebSocket events: Go types
task push-ws:generate:go \
  OUTPUT_DIR=/path/to/your/go/module \
  GO_PACKAGE_PREFIX=myprefix/generated \
  GO_MODULE_TRIM=myprefix
```

For Go code generators (`admin-api:generate:go` and `push-ws:generate:go`):
- `GO_PACKAGE_PREFIX`: The Go import path prefix where generated code lives (e.g., `shared/generated`). This prefix appears in the `go_package` option of generated protobuf messages.
- `GO_MODULE_TRIM`: The leading path segment that `protoc-gen-go` strips when computing the output directory. Must be a prefix of `GO_PACKAGE_PREFIX`; typically the first segment (e.g., `shared` when `GO_PACKAGE_PREFIX=shared/generated`).

Run `task --list` to see every generator, including the Go server interfaces used by the backend.

## Changing a contract

1. Change the schema or `.proto` here. The definition always comes first.
2. For Protocol Buffers, run `task admin-api:lint` / `task push-ws:lint` and the matching `:breaking` check.
3. Regenerate in each consumer.

## Contributing

Bug reports and proposals go to the [ServerlessInbox issue tracker](https://github.com/serverlessinbox/serverlessinbox/issues), whatever the component. For anything beyond a small fix, please open a [discussion](https://github.com/serverlessinbox/serverlessinbox/discussions) first.

## License

[Apache-2.0](LICENSE)
