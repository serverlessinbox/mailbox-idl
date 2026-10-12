import Ajv from 'ajv/dist/2020';
import standaloneCode from 'ajv/dist/standalone';

import type { JsonSchemaNode } from '../schema/json-schema';
import type { TsNaming } from './ts-naming';
import type { TsTemplates } from './templates';

/** A response validator of one method, as listed in validators.ts. */
export interface ValidatorEntry {
  readonly methodName: string;
  readonly responseBase: string;
}

/** AJV standalone code with its export declarations removed, and the name of the validate function. */
interface LocalValidator {
  readonly code: string;
  readonly functionName: string | null;
}

/**
 * Compiles response schemas into AJV standalone validators at generation time
 * and renders the file that maps every method to its validator.
 */
export class ValidatorEmitter {
  private readonly coreTypesSchema: JsonSchemaNode;
  private readonly templates: TsTemplates;
  private readonly naming: TsNaming;

  public constructor(coreTypesSchema: JsonSchemaNode, templates: TsTemplates, naming: TsNaming) {
    this.coreTypesSchema = coreTypesSchema;
    this.templates = templates;
    this.naming = naming;
  }

  /** Renders the `<response>.validator.ts` contents for one response schema. */
  public emitValidator(responseSchema: JsonSchemaNode): string {
    const ajv = new Ajv({ code: { source: true, esm: true }, strict: false, unicode: false });
    ajv.addSchema(this.coreTypesSchema);
    const validate = ajv.compile(responseSchema);
    const local = this.toLocalValidator(standaloneCode(ajv, validate));
    return this.templates.validatorFile(local.code, local.functionName);
  }

  /** Renders validators.ts, mapping each method name to its validator. */
  public emitValidatorsFile(entries: readonly ValidatorEntry[]): string {
    const aliasOf = (entry: ValidatorEntry): string => this.naming.validatorAlias(entry.methodName);
    return this.templates.validatorsFile(
      entries.map((entry) => this.templates.validatorImportLine(entry.responseBase, aliasOf(entry))),
      entries.map((entry) => this.templates.validatorMapEntry(entry.methodName, aliasOf(entry))),
    );
  }

  /**
   * AJV 8.20 and later emit `export const validate = fnN;export default fnN;`,
   * earlier versions emit `export default function fnN(...)`. Both forms are
   * rewritten so the function stays a plain local binding.
   */
  private toLocalValidator(code: string): LocalValidator {
    const declaration = code.match(/export default function (\w+)/);
    if (declaration) {
      const functionName = declaration[1];
      return {
        code: code.replace(`export default function ${functionName}`, `function ${functionName}`),
        functionName,
      };
    }

    const reference = code.match(/export default (\w+);/);
    if (reference) {
      const functionName = reference[1];
      return {
        code: code
          .replace(/export const validate = \w+;/, '')
          .replace(`export default ${functionName};`, ''),
        functionName,
      };
    }

    return { code, functionName: null };
  }
}
