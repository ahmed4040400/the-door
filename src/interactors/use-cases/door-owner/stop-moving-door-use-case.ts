import { IDoorBelongsToOwnerAuthorizer } from '../../../contracts/interactors/authorizers/door-belongs-to-user-authorizer.interface';
import { IStopMovingDoorUseCase } from '../../../contracts/interactors/use-cases/door-owner/stop-moving-door-use-case.interface';

import {
  DoorActionData,
  Action,
} from '../../../entities/dtos/door-action/door-action';

export class StopMovingDoorUseCase implements IStopMovingDoorUseCase {
  constructor(private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer) {}
  async execute(doorOwnerId: string, doorId: string): Promise<DoorActionData> {
    const isAuthorized = await this.doorBelongsToOwner.authorize(
      doorOwnerId,
      doorId,
    );
    if (isAuthorized) {
      const doorAction: DoorActionData = {
        doorId: doorId,
        action: Action.stop,
      };
      return doorAction;
    }
  }
}
