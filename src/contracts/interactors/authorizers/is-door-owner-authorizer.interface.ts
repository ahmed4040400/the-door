export interface IIsDoorOwnerAuthorizer {
  authorize(userId: string): Promise<boolean>;
}
