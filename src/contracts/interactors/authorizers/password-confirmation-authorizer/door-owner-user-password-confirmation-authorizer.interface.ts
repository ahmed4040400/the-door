export interface IDoorOwnerPasswordConfirmationAuthorizer {
  authorize(ownerId, password): Promise<boolean>;
}
