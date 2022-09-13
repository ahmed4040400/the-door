import { DoorEventInData } from 'src/entities/dtos/door-event/door-event-input';

export interface IDoorHistoryValidator {
  validate(doorEvent: DoorEventInData): Promise<boolean>;
}
