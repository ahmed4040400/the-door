import { IGetFromHistoryByEventIdRepository } from 'src/contracts/data/repositories/history/get-from-history-by-event-id-repository.interface';
import { IGetDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/doorOwner/get-door-owner-user-repository.interface';
import { IDoorHistoryAuthorizer } from 'src/contracts/interactors/authorizers/door-history-authorizer.interface';

export class DoorHistoryAuthorizer implements IDoorHistoryAuthorizer {
  constructor(
    private getDoorOwnerRepo: IGetDoorOwnerUserRepository,
    private getFromHistoryByEventIdRepo: IGetFromHistoryByEventIdRepository,
  ) {}
  async authorize(userId: string, eventId: string): Promise<boolean> {
    const doorOwnerUser = await this.getDoorOwnerRepo.getUser(userId);
    const event = await this.getFromHistoryByEventIdRepo.getEvent(eventId);
    return doorOwnerUser.doors.includes(event.doorId);
  }
}
