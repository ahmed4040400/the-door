export interface IDoorHistoryAuthorizer {
  authorize(userId: string, eventId: string): Promise<boolean>;
}
