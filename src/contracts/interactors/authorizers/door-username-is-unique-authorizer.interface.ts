export interface IDoorUsernameIsUniqueAuthorizer {
  authorize(string: string): boolean;
}
