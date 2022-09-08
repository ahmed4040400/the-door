import { DoorEvent } from 'src/entities/dtos/door-event/door-event';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export interface IHistoryDataSource {
  addEvent(doorEvent: DoorEvent): Promise<DoorEventOutData>;
  deleteEventById(id: string): Promise<DoorEventOutData>;
  getEventById(id: string): Promise<DoorEventOutData>;
}
