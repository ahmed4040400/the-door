export interface IDoorOwnerUsernameValidator {
  validate(doorOwnerUser: string): Promise<boolean>;
}
