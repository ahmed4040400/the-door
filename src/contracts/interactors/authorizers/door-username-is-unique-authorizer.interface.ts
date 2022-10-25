export interface IDoorUsernameIsUniqueAuthorizer {
  authorize(string: string): Promise<boolean>;
}
