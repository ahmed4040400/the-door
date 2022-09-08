import { IDeleteFromHistoryRepository } from 'src/contracts/data/repositories/history/delete-from-history-repository.interface';
import { IDeleteHistoryUseCase } from 'src/contracts/use-cases/door/delete-door-history-use-case.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

//TODO: implement an authorizer to make sure that the event is deleted by an authorized user
export class DeleteDoorHistoryUseCase implements IDeleteHistoryUseCase {
  constructor(private deleteFromHistoryRepo: IDeleteFromHistoryRepository) {}
  execute(userId: string, eventId: string): Promise<DoorEventOutData> {
    //TODO: implement an authorizer to compare the userId to the event creator
    return this.deleteFromHistoryRepo.deleteEvent(eventId);
  }
}
