export interface IEmailValidator {
  validate(email: string): Promise<boolean>;
}
