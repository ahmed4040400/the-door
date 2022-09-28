export interface IDoorUsernameValidator {
  validate(doorUserData: string): Promise<boolean>;
}
