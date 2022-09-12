import { NotAuthorizedError } from '../../../base/errors/not-authorized.error';
import { IDeleteFromHistoryRepository } from 'src/contracts/data/repositories/history/delete-from-history-repository.interface';
import { IDoorHistoryAuthorizer } from 'src/contracts/interactors/authorizers/door-history-authorizer.interface';
import { IDeleteHistoryUseCase } from 'src/contracts/interactors/use-cases/door/delete-door-history-use-case.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

//TODO: implement an authorizer to make sure that the event is deleted by an authorized user
export class DeleteDoorHistoryUseCase implements IDeleteHistoryUseCase {
  constructor(
    private deleteFromHistoryRepo: IDeleteFromHistoryRepository,
    private doorHistoryAuthorizer: IDoorHistoryAuthorizer,
  ) {}
  async execute(
    doorOwnerId: string,
    eventId: string,
  ): Promise<DoorEventOutData> {
    //TODO: implement an authorizer to compare the userId to the event creator
    const authorized = await this.doorHistoryAuthorizer.authorize(
      doorOwnerId,
      eventId,
    );

    if (authorized) {
      return this.deleteFromHistoryRepo.deleteEvent(eventId);
    }
  }
}
