import { IDoorBelongsToOwnerAuthorizer } from '../../../contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IOpenDoorUseCase } from '../../..//contracts/interactors/use-cases/door-owner/open-door-use-case.inteface';
import {
  DoorActionData,
  Action,
} from '../../../entities/dtos/door-action/door-action';

export class OpenDoorUseCase implements IOpenDoorUseCase {
  constructor(private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer) {}

  async execute(doorOwnerId: string, doorId: string): Promise<DoorActionData> {
    const isAuthorized = await this.doorBelongsToOwner.authorize(
      doorOwnerId,
      doorId,
    );
    if (isAuthorized) {
      const doorAction: DoorActionData = {
        doorId: doorId,
        action: Action.open,
      };
      return doorAction;
    }
  }
}
