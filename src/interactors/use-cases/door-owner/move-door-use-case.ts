import { IMoveDoor } from 'src/contracts/interactors/use-cases/door-owner/move-door-use-case.interface';
import { IDoorBelongsToOwnerAuthorizer } from '../../../contracts/interactors/authorizers/door-belongs-to-user-authorizer.interface';
import {
  DoorActionData,
  Action,
} from '../../../entities/dtos/door-action/door-action';

export class MoveDoorUseCase implements IMoveDoor {
  constructor(private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer) {}
  async execute(
    doorOwnerId: string,
    doorId: string,
    angleToMoveTo: number,
  ): Promise<DoorActionData> {
    const isAuthorized = await this.doorBelongsToOwner.authorize(
      doorOwnerId,
      doorId,
    );
    if (isAuthorized) {
      const doorAction: DoorActionData = {
        doorId: doorId,
        action: Action.move,
        angleTo: angleToMoveTo,
      };
      return doorAction;
    }
  }
}
