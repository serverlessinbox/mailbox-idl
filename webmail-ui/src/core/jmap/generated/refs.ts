/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */

export type ResultRef<M extends string = string, P extends string = string> = Readonly<{
  resultOf: string;
  name: M;
  path: P;
}>;

export const resultRef = <M extends string, P extends string>(resultOf: string, name: M, path: P): ResultRef<M, P> => ({
  resultOf,
  name,
  path,
});
