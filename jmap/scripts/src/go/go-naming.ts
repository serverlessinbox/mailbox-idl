/** Derives Go identifiers and file names from JSON keys, schema bases and JMAP method names. */
export class GoNaming {
  private readonly specialFieldNames = new Map<string, string>([
    ['@type', 'AtType'],
    ['id', 'ID'],
    ['accountId', 'AccountID'],
    ['fromAccountId', 'FromAccountID'],
    ['emailId', 'EmailID'],
    ['threadId', 'ThreadID'],
    ['blobId', 'BlobID'],
    ['identityId', 'IdentityID'],
    ['mailboxIds', 'MailboxIDs'],
    ['addressBookIds', 'AddressBookIDs'],
    ['emailIds', 'EmailIDs'],
    ['dsnBlobIds', 'DSNBlobIDs'],
    ['mdnBlobIds', 'MDNBlobIDs'],
    ['principalId', 'PrincipalID'],
    ['objectAccountId', 'ObjectAccountID'],
    ['cid', 'CID'],
  ]);

  /** `Email.get.args` becomes `email_get_args.go`. */
  public fileName(schemaBase: string): string {
    return schemaBase.toLowerCase().replace(/\./g, '_') + '.go';
  }

  /** `Email/get` becomes `EmailGet`. */
  public methodName(jmapMethodName: string): string {
    return jmapMethodName
      .split(/[/\s]+/)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('');
  }

  /** The exported Go field name of a JSON key, with the `Id` and `Ids` initialisms upper-cased. */
  public fieldName(jsonKey: string): string {
    const special = this.specialFieldNames.get(jsonKey);
    if (special !== undefined) {
      return special;
    }
    return (jsonKey[0].toUpperCase() + jsonKey.slice(1)).replace(/Id$/, 'ID').replace(/Ids$/, 'IDs');
  }
}
