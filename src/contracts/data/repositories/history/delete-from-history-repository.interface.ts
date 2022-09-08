import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export interface IDeleteFromHistoryRepository {
  deleteEvent(eventId: string): Promise<DoorEventOutData>;
}
