import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';
import { DoorEvent } from '../../entities/dtos/door-event/door-event';
import {
  DoorEventInData,
  Event,
} from '../../entities/dtos/door-event/door-event-input';

export class DoorEventDataStunt {
  inputData = {
    doorId: '1',
    event: Event.move,
    angleFrom: 100,
    angleTo: 121,
  } as DoorEventInData;

  calculateDoorEventOutputData(): DoorEventOutData {
    return { id: '12', ...this.calculateDoorEventData() } as DoorEventOutData;
  }

  calculateDoorEventData(): DoorEvent {
    return { ...this.inputData, movedAngle: this.CalculateAngleMovement() };
  }

  private CalculateAngleMovement() {
    return this.inputData.angleTo - this.inputData.angleFrom;
  }
}
