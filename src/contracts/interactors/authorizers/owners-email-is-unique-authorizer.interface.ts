export interface IOwnersEmailIsUniqueAuthorizer {
  authorize(string: string): boolean;
}
