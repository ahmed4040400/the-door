import { InvalidInputData } from '../../base/errors/invalid-input-data.error';
import { IDoorHistoryValidator } from 'src/contracts/interactors/validators/door-history-validator.interface';
import { IIsValid } from '../../contracts/interactors/validators/validate/validate.interface';
import {
  DoorEventInData,
  Event,
} from '../../entities/dtos/door-event/door-event-input';

const MINIMUM_ANGLE_LIMIT = 0;
const MAXIMUM_ANGLE_LIMIT = 180;
const SPECIFIED_EVENT_ACTIONS = [Event.open, Event.close, Event.move];

export class DoorHistoryValidator implements IDoorHistoryValidator {
  constructor(private isValid: IIsValid) {}

  async validate(doorEvent: DoorEventInData): Promise<boolean> {
    const isValidEvent = await this.validateEvent(doorEvent.event);

    const angleFromIsInRange = await this.validateAngleFrom(
      doorEvent.angleFrom,
    );

    const angleToIsInRange = await this.validateAngleTo(doorEvent.angleTo);

    return isValidEvent && angleFromIsInRange && angleToIsInRange;
  }

  private async validateEvent(event): Promise<boolean> {
    const isValidEvent = await this.isValid.isOneOf(
      event,
      SPECIFIED_EVENT_ACTIONS,
    );
    if (!isValidEvent) {
      throw new InvalidInputData(`Invalid event ${event}`);
    }
    return isValidEvent;
  }

  private async validateAngleFrom(angle): Promise<boolean> {
    const angleFromIsInRange = await this.isValid.inRange(
      angle,
      MINIMUM_ANGLE_LIMIT,
      MAXIMUM_ANGLE_LIMIT,
    );

    if (!angleFromIsInRange) {
      throw new InvalidInputData('angleFrom is out of range');
    }
    return angleFromIsInRange;
  }

  private async validateAngleTo(angle): Promise<boolean> {
    const angleToIsInRange = await this.isValid.inRange(
      angle,
      MINIMUM_ANGLE_LIMIT,
      MAXIMUM_ANGLE_LIMIT,
    );

    if (!angleToIsInRange) {
      throw new InvalidInputData('angleTo is out of range');
    }
    return angleToIsInRange;
  }
}
