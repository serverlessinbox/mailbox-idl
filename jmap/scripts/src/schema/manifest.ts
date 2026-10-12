import * as t from 'typanion';

const isResultRefProvide = t.isObject({
  responsePath: t.isString(),
});

const isResultRefSource = t.isObject({
  method: t.isString(),
  responsePath: t.isString(),
});

const isResultRefAccept = t.isObject({
  argKey: t.isString(),
  targetArgPath: t.isString(),
  source: isResultRefSource,
});

const isResultRefs = t.isObject({
  provides: t.isOptional(t.isArray(isResultRefProvide)),
  accepts: t.isOptional(t.isArray(isResultRefAccept)),
});

const isManifestDx = t.isObject({
  resultRefs: t.isOptional(isResultRefs),
});

const isManifestMethod = t.isObject({
  name: t.isString(),
  capability: t.isString(),
  argsSchema: t.isString(),
  responseSchema: t.isString(),
  dx: t.isOptional(isManifestDx),
});

/** One JMAP method of manifest.yaml: its schemas and the result references it provides or accepts. */
export type ManifestMethod = t.InferType<typeof isManifestMethod>;

/** A result reference a method accepts as an argument, sourced from another method's response. */
export type ResultRefAccept = t.InferType<typeof isResultRefAccept>;

/** Validates the parsed content of manifest.yaml. */
export const isManifest = t.isObject({
  version: t.isOptional(t.isNumber()),
  capabilities: t.isOptional(t.isArray(t.isString())),
  methods: t.isOptional(t.isArray(isManifestMethod)),
});

/** The parsed and validated content of manifest.yaml. */
export type Manifest = t.InferType<typeof isManifest>;
