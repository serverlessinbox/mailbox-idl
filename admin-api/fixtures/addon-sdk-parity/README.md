# Addon SDK parity fixtures

Golden fixtures shared by the Go admin-api registry and the TypeScript addon SDK.
Each consumer loads these files in its own tests; a change here must keep both passing.

| File | Contract |
|---|---|
| `audit-event.json` | One audit event as the audit-writer accepts it (`AuditLogCreate`): `action` is `<Service>/<Method>`, `actor.actorType` is `user`, `actor.actorId` is the caller's principal id and `actor.username` the principal's name, `actor.ipAddress` is the request source IP. A producer's event for the same inputs must serialize to exactly these fields. |
| `error-status-table.json` | Error category to HTTP status. Any category not listed answers `Other` (500) with a generic body; the cause is logged, never returned. |
| `read-verbs.json` | Method-name prefixes that mark a read method. |
