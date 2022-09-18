import { IDeleteFromHistoryRepository } from 'src/contracts/data/repositories/history/delete-from-history-repository.interface';
import { IDoorBelongsToOwnerAuthorizer } from 'src/contracts/interactors/authorizers/door-belongs-to-user-authorizer.interface';
import { IDeleteHistoryUseCase } from 'src/contracts/interactors/use-cases/door/delete-door-history-use-case.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export class DeleteDoorHistoryUseCase implements IDeleteHistoryUseCase {
  constructor(
    private deleteFromHistoryRepo: IDeleteFromHistoryRepository,
    private doorHistoryAuthorizer: IDoorBelongsToOwnerAuthorizer,
  ) {}
  async execute(
    doorOwnerId: string,
    eventId: string,
  ): Promise<DoorEventOutData> {
    const authorized = await this.doorHistoryAuthorizer.authorize(
      doorOwnerId,
      eventId,
    );

    if (authorized) {
      return this.deleteFromHistoryRepo.deleteEvent(eventId);
    }
  }
}
