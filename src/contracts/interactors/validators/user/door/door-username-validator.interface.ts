export interface IDoorUsernameValidator {
  validate(username: string): Promise<boolean>;
}
