import { DoorEventOutData } from '../../../../entities/dtos/door-event/door-event-output';
import { DoorEvent } from '../../../../entities/dtos/door-event/door-event';

export interface IAddToHistoryRepository {
  addEvent(userId: string, event: DoorEvent): Promise<DoorEventOutData>;
}
