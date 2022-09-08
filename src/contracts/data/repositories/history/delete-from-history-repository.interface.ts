import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export interface IDeleteFromHistoryRepository {
  deleteEvent(userId: string, eventId: string): Promise<DoorEventOutData>;
}
