export interface IPasswordValidator {
  validate(password: string): Promise<boolean>;
}
