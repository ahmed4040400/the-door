export interface IDoorBelongsToOwnerAuthorizer {
  authorize(doorOwnerId: string, doorId: string): Promise<boolean>;
}
