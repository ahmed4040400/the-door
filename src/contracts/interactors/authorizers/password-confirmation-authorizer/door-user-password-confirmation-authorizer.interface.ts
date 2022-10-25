export interface IDoorPasswordConfirmationAuthorizer {
  authorize(doorId: string, password: string): Promise<boolean>;
}
