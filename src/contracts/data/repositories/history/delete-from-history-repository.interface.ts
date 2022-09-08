import { DoorEvent } from 'src/entities/dtos/door-event/door-event';

export interface IDeleteFromHistoryRepository {
  deleteEvent(id: string): Promise<DoorEvent>;
}
