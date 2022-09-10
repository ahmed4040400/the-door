import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export interface IGetFromHistoryByEventIdRepository {
  getEvent(eventId: string): Promise<DoorEventOutData>;
}
