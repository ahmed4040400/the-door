import { DoorEventInData } from '../../entities/dtos/door-event/door-event-input';
import { DoorEvent } from '../../entities/dtos/door-event/door-event';

export interface IDoorHistoryEntity {
  getOutData(doorEventInputData: Required<DoorEventInData>): DoorEvent;
}
