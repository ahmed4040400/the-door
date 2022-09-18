export interface IDoorBelongsToOwnerAuthorizer {
  authorize(userId: string, eventId: string): Promise<boolean>;
}
