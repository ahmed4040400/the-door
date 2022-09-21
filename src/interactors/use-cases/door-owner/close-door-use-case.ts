import { ICloseDoor } from 'src/contracts/interactors/use-cases/door-owner/close-door-use-case.interface';
import { IDoorBelongsToOwnerAuthorizer } from '../../../contracts/interactors/authorizers/door-belongs-to-user-authorizer.interface';
import {
  DoorActionData,
  Action,
} from '../../../entities/dtos/door-action/door-action';

export class CloseDoorUseCase implements ICloseDoor {
  constructor(private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer) {}
  async execute(doorOwnerId: string, doorId: string): Promise<DoorActionData> {
    const isAuthorized = await this.doorBelongsToOwner.authorize(
      doorOwnerId,
      doorId,
    );
    if (isAuthorized) {
      const doorAction: DoorActionData = {
        doorId: doorId,
        action: Action.close,
        angleTo: null,
      };
      return doorAction;
    }
  }
}
