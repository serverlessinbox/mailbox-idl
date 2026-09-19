#!/usr/bin/env node
/**
 * generate-go.mjs — Generate Go types from JMAP JSON Schemas.
 *
 * Traverses JSON Schema directly — no quicktype dependency.
 *
 * Usage:
 *   OUTPUT_DIR=./go node ./scripts/generate-go.mjs
 *
 * Called by Taskfile.yml `generate:go` and `generate:go:inplace` tasks.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const outDir = process.env.OUTPUT_DIR;
if (!outDir) {
  console.error('ERROR: OUTPUT_DIR env var is required');
  process.exit(2);
}

const pkg = process.env.PACKAGE || 'jmapsdk';

const scriptDir = path.resolve(path.dirname(new URL(import.meta.url).pathname));
const repoDir = path.resolve(scriptDir, '..');
const manifestPath = path.join(repoDir, 'manifest.yaml');
const coreTypesPath = path.join(repoDir, 'schemas/core/types.schema.json');

await fs.mkdir(outDir, { recursive: true });

// ---------------------------------------------------------------------------
// Load manifest
// ---------------------------------------------------------------------------

const manifestText = await fs.readFile(manifestPath, 'utf8');
const manifest = YAML.parse(manifestText);
const methods = Array.isArray(manifest?.methods) ? manifest.methods : [];

// ---------------------------------------------------------------------------
// String-only defs — inline as "string" in Go, never emit a named type
// ---------------------------------------------------------------------------

const STRING_ONLY_DEFS = new Set([
  'Id', 'AccountId', 'EmailId', 'MailboxId', 'ThreadId', 'JmapDate',
  'SubmissionId', 'IdentityId', 'BlobId', 'CreationId',
  'AddressBookId', 'ContactCardId', 'PrincipalId', 'ShareNotificationId',
]);

// ---------------------------------------------------------------------------
// Special defs — skip (already hand-written in shared.go)
// ---------------------------------------------------------------------------

const SKIP_DEFS = new Set(['PatchObject']);

// ---------------------------------------------------------------------------
// Files to protect during cleanup — go.mod may be generated into a module root
// ---------------------------------------------------------------------------

const PROTECTED_FILES = new Set(['go.mod']);

// ---------------------------------------------------------------------------
// Runtime templates to emit as .go files
// ---------------------------------------------------------------------------

const RUNTIME_TEMPLATES = ['client.go', 'session.go', 'refs.go', 'batch.go', 'doc.go', 'shared.go'];

// ---------------------------------------------------------------------------
// Load core types schema and build defs map
// ---------------------------------------------------------------------------

const coreTypesText = await fs.readFile(coreTypesPath, 'utf8');
const coreTypesSchema = JSON.parse(coreTypesText);
const defs = coreTypesSchema.$defs ?? {};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert schema base "Email.get.args" to snake_case filename "email_get_args.go".
 */
function schemaBaseToFilename(schemaBase) {
  return schemaBase.toLowerCase().replace(/\./g, '_') + '.go';
}

/**
 * Convert schema base "Email.get.args" to PascalCase type name "EmailGetArgs".
 */
function schemaBaseToTypeName(schemaBase) {
  return schemaBase
    .split('.')
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');
}

/**
 * Convert manifest method name like "Email/get" to a Go method name like "EmailGet".
 */
function methodNameToGo(name) {
  return name
    .split(/[/\s]+/)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');
}

/**
 * Resolve a $ref string to the def name.
 * Handles both "#/$defs/Foo" and "../core/types.schema.json#/$defs/Foo".
 * Returns the def name string or null if not a defs ref.
 */
function resolveRef(ref) {
  const defsIdx = ref.indexOf('#/$defs/');
  if (defsIdx === -1) return null;
  return ref.slice(defsIdx + '#/$defs/'.length);
}

/**
 * Apply field name special cases.
 * JSON key → Go field name.
 */
function jsonKeyToFieldName(key) {
  const specials = {
    '@type': 'AtType',
    id: 'ID',
    accountId: 'AccountID',
    fromAccountId: 'FromAccountID',
    emailId: 'EmailID',
    threadId: 'ThreadID',
    blobId: 'BlobID',
    identityId: 'IdentityID',
    mailboxIds: 'MailboxIDs',
    addressBookIds: 'AddressBookIDs',
    emailIds: 'EmailIDs',
    dsnBlobIds: 'DSNBlobIDs',
    mdnBlobIds: 'MDNBlobIDs',
    principalId: 'PrincipalID',
    objectAccountId: 'ObjectAccountID',
    cid: 'CID',
  };
  if (key in specials) return specials[key];

  let name = key[0].toUpperCase() + key.slice(1);
  name = name.replace(/Id$/, 'ID');
  name = name.replace(/Ids$/, 'IDs');
  return name;
}

/**
 * Map a JSON Schema to a Go type string.
 *
 * @param {object} schema - The JSON Schema object
 * @param {boolean} required - Whether the field is required (affects pointer wrapping)
 * @param {object} localDefs - Local $defs from this schema file (for inline refs like #/$defs/SetError)
 * @param {string} localDefsPrefix - PascalCase prefix for local def type names
 * @returns {string} Go type string
 */
function schemaToGoType(schema, required, localDefs, localDefsPrefix) {
  if (!schema) return 'any';

  // Handle $ref
  if (schema.$ref) {
    const defName = resolveRef(schema.$ref);
    if (!defName) return 'any';

    // Check local defs first — but only use the prefixed local name if the def
    // is genuinely local (not a redeclaration of a global/core type).
    if (localDefs && defName in localDefs) {
      // If the name is also in core defs, string-only, or skip list: fall through
      // to global handling so we use the canonical core type name.
      const isCoreDef = defName in defs || STRING_ONLY_DEFS.has(defName) || SKIP_DEFS.has(defName);
      if (!isCoreDef) {
        const localDef = localDefs[defName];
        if (localDef.type === 'string') return required ? 'string' : '*string';
        return localDefsPrefix + defName;
      }
    }

    // Global string-only defs → inline as "string"
    if (STRING_ONLY_DEFS.has(defName)) {
      return required ? 'string' : '*string';
    }
    // PatchObject → "PatchObject"
    if (defName === 'PatchObject') {
      return 'PatchObject';
    }
    // Complex def → use def name as-is
    return defName;
  }

  // Handle anyOf
  if (schema.anyOf) {
    const nonNull = schema.anyOf.filter((s) => s.type !== 'null' && !(s.$ref === undefined && Object.keys(s).length === 0));
    const hasNull = schema.anyOf.some((s) => s.type === 'null');

    if (nonNull.length === 0) return 'any';
    if (nonNull.length === 1) {
      const inner = schemaToGoType(nonNull[0], true, localDefs, localDefsPrefix);
      if (hasNull) {
        // Wrap in pointer unless already a pointer, map, or slice
        if (inner.startsWith('*') || inner.startsWith('map[') || inner.startsWith('[]')) {
          return inner;
        }
        return '*' + inner;
      }
      return required ? inner : (inner.startsWith('*') || inner.startsWith('map[') || inner.startsWith('[]') ? inner : '*' + inner);
    }
    // Multiple non-null types
    return 'any';
  }

  const t = schema.type;

  // Handle array types (including nullable arrays like ["string", "null"])
  if (Array.isArray(t)) {
    if (t.includes('null') && t.length === 2) {
      const baseType = t.find((x) => x !== 'null');
      const inner = schemaToGoType({ type: baseType, items: schema.items, additionalProperties: schema.additionalProperties, properties: schema.properties }, true, localDefs, localDefsPrefix);
      if (inner.startsWith('*') || inner.startsWith('map[') || inner.startsWith('[]')) return inner;
      return '*' + inner;
    }
    // Multiple types — fallback
    return 'any';
  }

  switch (t) {
    case 'string':
      return required ? 'string' : '*string';
    case 'integer':
      return required ? 'int64' : '*int64';
    case 'number':
      return required ? 'float64' : '*float64';
    case 'boolean':
      return required ? 'bool' : '*bool';
    case 'array': {
      const items = schema.items ?? {};
      const itemType = schemaToGoType(items, true, localDefs, localDefsPrefix);
      return '[]' + itemType;
    }
    case 'object': {
      if (schema.additionalProperties && schema.additionalProperties !== false && schema.additionalProperties !== true) {
        const valType = schemaToGoType(schema.additionalProperties, true, localDefs, localDefsPrefix);
        return 'map[string]' + valType;
      }
      if (schema.additionalProperties === true || (schema.additionalProperties === undefined && !schema.properties)) {
        return 'map[string]any';
      }
      if (schema.properties) {
        // Inline object with properties — we'll need to generate an anonymous struct or map
        // For method schemas we handle this at the property level
        return 'map[string]any';
      }
      return 'map[string]any';
    }
    default:
      return 'any';
  }
}

/**
 * Generate a Go struct from a JSON Schema object's properties.
 *
 * @param {string} typeName - The Go type name
 * @param {object} schema - The JSON Schema
 * @param {Set<string>} refFields - Set of JSON field names that accept result refs
 * @param {object} localDefs - Local $defs in this schema file
 * @param {string} localDefsPrefix - PascalCase prefix for local def type names
 * @returns {string} Go source lines for this struct
 */
function generateStruct(typeName, schema, refFields, localDefs, localDefsPrefix) {
  const required = new Set(schema.required ?? []);
  const properties = schema.properties ?? {};
  const description = schema.description ?? schema.title ?? '';

  let lines = [];
  if (description) {
    lines.push(`// ${typeName} ${description}`);
  }
  lines.push(`type ${typeName} struct {`);

  for (const [key, propSchema] of Object.entries(properties)) {
    const fieldName = jsonKeyToFieldName(key);
    const isRequired = required.has(key);
    const propDesc = propSchema.description ?? '';

    let goType;
    if (refFields && refFields.has(key)) {
      // Result-ref capable field — strongly typed union
      goType = 'StringOrRef';
    } else {
      goType = schemaToGoType(propSchema, isRequired, localDefs, localDefsPrefix);
    }

    let tag;
    if (isRequired) {
      tag = `\`json:"${key}"\``;
    } else {
      tag = `\`json:"${key},omitempty"\``;
    }

    let comment = propDesc ? ` // ${propDesc}` : '';
    if (refFields && refFields.has(key)) {
      comment = ` // StringIDs(...) for a literal list, Ref(handle, path) for a result reference.`;
    }

    lines.push(`\t${fieldName} ${goType} ${tag}${comment}`);
  }

  lines.push(`}`);
  return lines.join('\n');
}

/**
 * Generate an allOf-based struct (like MailboxExt, EmailExt).
 * Embeds the base struct and adds ExtraProperties for patternProperties.
 */
function generateAllOfStruct(typeName, schema) {
  const allOf = schema.allOf;
  if (!allOf || allOf.length === 0) return null;

  // First entry is the base ref
  const baseRef = allOf[0].$ref;
  if (!baseRef) return null;
  const baseDefName = resolveRef(baseRef);
  if (!baseDefName || STRING_ONLY_DEFS.has(baseDefName) || SKIP_DEFS.has(baseDefName)) return null;

  let lines = [];
  lines.push(`// ${typeName} extends ${baseDefName} with vendor-prefixed properties.`);
  lines.push(`type ${typeName} struct {`);
  lines.push(`\t${baseDefName}`);
  lines.push(`\t// captures sib: vendor-prefixed properties`);
  lines.push(`\tExtraProperties map[string]json.RawMessage \`json:"-"\``);
  lines.push(`}`);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Step 1: Generate core_types.go from types.schema.json
// ---------------------------------------------------------------------------

// Complex defs to generate (in definition order from the spec)
const COMPLEX_DEFS = [
  'EmailHeader', 'Keywords', 'Mailbox', 'MailboxBase', 'MailboxExt',
  'Email', 'EmailBase', 'EmailExt', 'EmailBodyValue', 'EmailBodyPart', 'SetError', 'EmailAddress',
  'AddressWithParameters', 'Envelope', 'DeliveryStatus', 'EmailSubmission',
  'EmailSubmissionCreate', 'Identity', 'IdentityUpdate', 'MailboxCreate',
  'MailboxUpdate', 'ImportEmailObject', 'AddressBookRights', 'AddressBook',
  'AddressBookCreate', 'AddressBookUpdate', 'NameComponent', 'ContactCardName',
  'ContactCardEmail', 'ContactCardPhone', 'AddressComponent', 'ContactCardAddress',
  'OrgUnit', 'ContactCardOrganization', 'ContactCardTitle', 'ContactCardNote',
  'PartialDate', 'ContactCardAnniversary', 'ContactCardMedia', 'ContactCard',
  'ContactCardCreate', 'ContactCardUpdate', 'Principal', 'ShareNotificationBy',
  'ShareNotification',
];

// Also include Thread which is in the schema but not listed — check
// (Thread is in the schema; we should include it)
const THREAD_IN_SCHEMA = 'Thread' in defs;

const coreTypesParts = [
  `// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.`,
  ``,
  `package ${pkg}`,
  ``,
  `import "encoding/json"`,
  ``,
];

const allComplexDefs = [...COMPLEX_DEFS];
if (THREAD_IN_SCHEMA && !allComplexDefs.includes('Thread')) {
  allComplexDefs.splice(allComplexDefs.indexOf('Email'), 0, 'Thread');
}

for (const defName of allComplexDefs) {
  const defSchema = defs[defName];
  if (!defSchema) {
    console.warn(`  WARN: def ${defName} not found in types.schema.json`);
    continue;
  }

  if (SKIP_DEFS.has(defName)) continue;

  // Special case: Keywords → type alias
  if (defName === 'Keywords') {
    coreTypesParts.push(`// Keywords is a map of IMAP keyword → true. The presence of a key means the keyword is set (RFC 8621 §4.1.1).`);
    coreTypesParts.push(`type Keywords = map[string]bool`);
    coreTypesParts.push(``);
    continue;
  }

  // Handle allOf (MailboxExt, EmailExt)
  if (defSchema.allOf) {
    const src = generateAllOfStruct(defName, defSchema);
    if (src) {
      coreTypesParts.push(src);
      coreTypesParts.push(``);
    }
    continue;
  }

  // Normal struct
  const src = generateStruct(defName, defSchema, null, null, '');
  coreTypesParts.push(src);
  coreTypesParts.push(``);
}

const coreTypesOut = path.join(outDir, 'core_types.go');
await fs.writeFile(coreTypesOut, coreTypesParts.join('\n'), 'utf8');
console.log(`  wrote core_types.go`);

// ---------------------------------------------------------------------------
// Step 2: Clean up stale generated files (except protected files)
// ---------------------------------------------------------------------------

const existingFiles = await fs.readdir(outDir);
for (const f of existingFiles) {
  if (!f.endsWith('.go') && f !== 'go.mod') continue;
  if (PROTECTED_FILES.has(f)) continue;
  if (f === 'core_types.go') continue; // just wrote it
  // Skip runtime templates that will be written in Step 2b
  if (RUNTIME_TEMPLATES.includes(f)) continue;
  const fullPath = path.join(outDir, f);
  await fs.unlink(fullPath);
  console.log(`  deleted stale file: ${f}`);
}

// ---------------------------------------------------------------------------
// Step 2b: Write runtime templates with package substitution
// ---------------------------------------------------------------------------

const runtimeDir = path.join(scriptDir, 'go-runtime');

for (const templateName of RUNTIME_TEMPLATES) {
  const templatePath = path.join(runtimeDir, templateName + '.tmpl');
  const outPath = path.join(outDir, templateName);

  try {
    const templateContent = await fs.readFile(templatePath, 'utf8');

    // Add generated header line at the top.
    let output = '// Code generated from mailbox-idl/jmap. DO NOT EDIT.\n\n';

    // Replace "package jmapsdk" with "package <pkg>"
    let content = templateContent.replace(/^package\s+\w+/m, `package ${pkg}`);

    // For doc.go, also update the package comment to use the correct package name
    if (templateName === 'doc.go') {
      content = content.replace(
        /^\/\/ Package\s+\w+/m,
        `// Package ${pkg}`
      );
    }

    output += content;
    await fs.writeFile(outPath, output, 'utf8');
    console.log(`  wrote ${templateName} (from template)`);
  } catch (err) {
    console.error(`  ERROR writing ${templateName}: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Collect result-ref metadata from manifest
// ---------------------------------------------------------------------------

/** Map from method name → set of target arg JSON field names (no "#" prefix). */
const refAcceptsByMethod = new Map();

for (const m of methods) {
  const name = m?.name;
  const accepts = m?.dx?.resultRefs?.accepts;
  if (!name || !Array.isArray(accepts)) continue;

  const fields = new Set();
  for (const a of accepts) {
    const argPath = a?.targetArgPath;
    if (typeof argPath === 'string' && argPath.startsWith('/')) {
      fields.add(argPath.slice(1));
    }
  }
  if (fields.size > 0) refAcceptsByMethod.set(name, fields);
}

// ---------------------------------------------------------------------------
// Step 3: Generate per-method type files
// ---------------------------------------------------------------------------

/**
 * Generate Go source for a single method schema file.
 *
 * @param {string} schemaPath - Absolute path to the schema file
 * @param {string} schemaBase - e.g. "AddressBook.changes.args"
 * @param {string} typeName - e.g. "AddressbookChangesArgs"
 * @param {Set<string>} refFields - fields that accept result refs
 * @returns {string} Go source
 */
function generateMethodFile(schemaText, typeName, refFields) {
  const schema = JSON.parse(schemaText);

  // Local $defs (e.g. Email.set.args has local CreationId, PatchObject)
  const localDefs = schema.$defs ?? {};
  const localDefsPrefix = typeName; // prefix local helper types with the method type name

  const needsJSON = hasAllOfDefs(localDefs);

  const parts = [
    `// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.`,
    ``,
    `package ${pkg}`,
    ``,
  ];

  if (needsJSON) {
    parts.push(`import "encoding/json"`);
    parts.push(``);
  }

  // Generate local helper structs for local $defs (that aren't string-only or skipped)
  for (const [localDefName, localDefSchema] of Object.entries(localDefs)) {
    if (STRING_ONLY_DEFS.has(localDefName)) continue;
    if (SKIP_DEFS.has(localDefName)) continue;
    // SetError is in core_types.go — skip if it's a local redefinition
    if (localDefName === 'SetError') continue;

    if (localDefSchema.allOf) {
      const src = generateAllOfStruct(localDefsPrefix + localDefName, localDefSchema);
      if (src) {
        parts.push(src);
        parts.push('');
      }
    } else if (localDefSchema.type === 'object' && localDefSchema.properties) {
      const src = generateStruct(localDefsPrefix + localDefName, localDefSchema, null, null, '');
      parts.push(src);
      parts.push('');
    }
  }

  // Generate the top-level struct for the method
  const src = generateStruct(typeName, schema, refFields, localDefs, localDefsPrefix);
  parts.push(src);
  parts.push('');

  return parts.join('\n');
}

/**
 * Check if we need "encoding/json" import (for allOf structs with json.RawMessage).
 */
function hasAllOfDefs(localDefs) {
  for (const [, defSchema] of Object.entries(localDefs)) {
    if (defSchema.allOf) return true;
  }
  return false;
}

const generatedFiles = [];

for (const method of methods) {
  const name = method?.name;
  const argsSchema = method?.argsSchema;
  const responseSchema = method?.responseSchema;
  if (!name || !argsSchema || !responseSchema) continue;

  for (const [schemaRelPath, kind] of [
    [argsSchema, 'args'],
    [responseSchema, 'response'],
  ]) {
    const schemaPath = path.join(repoDir, schemaRelPath);
    const schemaBase = path.basename(schemaRelPath).replace(/\.schema\.json$/, '');
    const typeName = schemaBaseToTypeName(schemaBase);
    const outFile = path.join(outDir, schemaBaseToFilename(schemaBase));

    const refFields = kind === 'args' ? (refAcceptsByMethod.get(name) ?? new Set()) : new Set();

    console.log(`  generating ${schemaBase} → ${path.relative(repoDir, outFile)}`);

    try {
      const schemaText = await fs.readFile(schemaPath, 'utf8');
      const src = generateMethodFile(schemaText, typeName, refFields);
      await fs.writeFile(outFile, src, 'utf8');
      generatedFiles.push({ name, kind, schemaBase, outFile, typeName });
    } catch (err) {
      console.error(`  ERROR generating ${schemaBase}: ${err.message}`);
      console.error(err.stack);
    }
  }
}

// ---------------------------------------------------------------------------
// Step 4: Generate typed_client.go
// ---------------------------------------------------------------------------

const typedClientMethods = [];
const typedBatchMethods = [];

for (const method of methods) {
  const name = method?.name;
  const argsSchema = method?.argsSchema;
  const responseSchema = method?.responseSchema;
  if (!name || !argsSchema || !responseSchema) continue;

  const argsBase = path.basename(argsSchema).replace(/\.schema\.json$/, '');
  const respBase = path.basename(responseSchema).replace(/\.schema\.json$/, '');
  const argsType = schemaBaseToTypeName(argsBase);
  const respType = schemaBaseToTypeName(respBase);
  const goMethodName = methodNameToGo(name);
  const cap = method?.capability ?? '';

  typedClientMethods.push(
    `// ${goMethodName} executes a single ${name} call and returns the parsed response.\n` +
    `func (tc *TypedClient) ${goMethodName}(ctx context.Context, args ${argsType}) (*${respType}, error) {\n` +
    `\tb := NewBatch(${JSON.stringify(cap)})\n` +
    `\tb.Add(${JSON.stringify(name)}, args)\n` +
    `\tresp, err := tc.c.Do(ctx, b.Request())\n` +
    `\tif err != nil { return nil, err }\n` +
    `\tif len(resp.MethodResponses) == 0 { return nil, fmt.Errorf("jmapsdk: empty response for ${name}") }\n` +
    `\tvar result ${respType}\n` +
    `\tif err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil { return nil, err }\n` +
    `\treturn &result, nil\n` +
    `}\n`
  );

  typedBatchMethods.push(
    `// ${goMethodName} appends an ${name} call to the batch and returns a typed handle.\n` +
    `func (tb *TypedBatch) ${goMethodName}(args ${argsType}) BatchHandle[${respType}] {\n` +
    `\tcallID := tb.b.Add(${JSON.stringify(name)}, args)\n` +
    `\treturn BatchHandle[${respType}]{callID: callID, methodName: ${JSON.stringify(name)}}\n` +
    `}\n`
  );
}

const typedClientSrc =
  `// Code generated from mailbox-idl/jmap manifest. DO NOT EDIT.\n\n` +
  `package ${pkg}\n\n` +
  `import (\n` +
  `\t"context"\n` +
  `\t"encoding/json"\n` +
  `\t"fmt"\n` +
  `)\n\n` +
  `// TypedClient wraps a raw Client and exposes one strongly-typed method per JMAP method.\n` +
  `type TypedClient struct{ c Client }\n\n` +
  `// NewTypedClient creates a TypedClient wrapping the given Client.\n` +
  `func NewTypedClient(c Client) *TypedClient { return &TypedClient{c: c} }\n\n` +
  typedClientMethods.join('\n');

await fs.writeFile(path.join(outDir, 'typed_client.go'), typedClientSrc, 'utf8');
console.log(`  wrote typed_client.go`);

// ---------------------------------------------------------------------------
// Step 5: Generate typed_batch.go
// ---------------------------------------------------------------------------

const typedBatchSrc =
  `// Code generated from mailbox-idl/jmap manifest. DO NOT EDIT.\n\n` +
  `package ${pkg}\n\n` +
  typedBatchMethods.join('\n');

await fs.writeFile(path.join(outDir, 'typed_batch.go'), typedBatchSrc, 'utf8');
console.log(`  wrote typed_batch.go`);

// ---------------------------------------------------------------------------
// Step 6: Format all generated Go files with gofmt
// ---------------------------------------------------------------------------

import { spawnSync } from 'node:child_process';

try {
  const result = spawnSync('gofmt', ['-w', outDir], {
    encoding: 'utf8',
  });

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      console.error('ERROR: gofmt not found. Go must be installed and gofmt must be on PATH.');
      process.exit(1);
    }
    throw result.error;
  }

  if (result.status !== 0) {
    console.error('ERROR: gofmt failed:', result.stderr);
    process.exit(1);
  }

  console.log(`  formatted with gofmt`);
} catch (err) {
  console.error('ERROR running gofmt:', err.message);
  process.exit(1);
}

console.log(`\nDone. Generated core_types.go + ${generatedFiles.length} method files + typed_client.go + typed_batch.go`);
