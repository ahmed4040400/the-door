export interface IOwnersEmailIsUniqueAuthorizer {
  authorize(string: string): Promise<boolean>;
}
