import { IDoorHistoryEntity } from '../contracts/entities/door-history.interface';
import { LackOfInputDataError } from '../base/errors/input-data-missing.error';
import { DoorEventInData } from './dtos/door-event/door-event-input';
import { DoorEvent } from './dtos/door-event/door-event';

export class DoorHistoryEntity implements IDoorHistoryEntity {
  private doorEventInData: Required<DoorEventInData>;

  private doorEventOutData: DoorEvent;

  getOutData(inputData: Required<DoorEventInData>): DoorEvent {
    this.doorEventInData = inputData;

    this.checkForMissingData();

    const movedAngle = this.calculateAngleMovement();

    this.doorEventOutData = {
      ...this.doorEventInData,
      movedAngle: movedAngle,
    };
    return this.doorEventOutData;
  }

  private calculateAngleMovement() {
    return this.doorEventInData.angleTo - this.doorEventInData.angleFrom;
  }

  private checkForMissingData() {
    for (const element of Object.keys(this.doorEventInData)) {
      this.throwIfElementISEmpty(element);
    }
  }

  private throwIfElementISEmpty(element: string) {
    if (this.elementIsEmpty(element)) {
      throw new LackOfInputDataError(
        'element' + ' ' + element + ' ' + 'is empty',
      );
    }
  }
  private elementIsEmpty(element): boolean {
    return !this.doorEventInData[element];
  }
}
