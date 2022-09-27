export interface IEventBelongsToOwnerAuthorizer {
  authorize(doorOwnerId: string, eventId: string): Promise<boolean>;
}
