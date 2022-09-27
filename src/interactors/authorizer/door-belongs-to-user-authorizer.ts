import { NotAuthorizedError } from '../../base/errors/not-authorized.error';
import { IGetFromHistoryByEventIdRepository } from 'src/contracts/data/repositories/history/get-from-history-by-event-id-repository.interface';
import { IGetDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/get-door-owner-user-repository.interface';
import { IDoorBelongsToOwnerAuthorizer } from '../../contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';

export class DoorBelongsToOwnerAuthorizer
  implements IDoorBelongsToOwnerAuthorizer
{
  constructor(
    private getDoorOwnerRepo: IGetDoorOwnerUserRepository,
    private getFromHistoryByEventIdRepo: IGetFromHistoryByEventIdRepository,
  ) {}
  async authorize(userId: string, eventId: string): Promise<boolean> {
    const doorOwnerUser = await this.getDoorOwnerRepo.getUser(userId);
    const event = await this.getFromHistoryByEventIdRepo.getEvent(eventId);

    const doorOwnerNotAuthorized = !doorOwnerUser.doors.includes(event.doorId);

    if (doorOwnerNotAuthorized) {
      throw new NotAuthorizedError(
        `user is not authorized for making such an action`,
      );
    }
    return true;
  }
}
