import { IDeleteFromHistoryRepository } from 'src/contracts/data/repositories/history/delete-from-history-repository.interface';
import { IDeleteHistoryUseCase } from 'src/contracts/use-cases/door/delete-door-history-use-case.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export class DeleteDoorHistoryUseCase implements IDeleteHistoryUseCase {
  constructor(private deleteFromHistoryRepo: IDeleteFromHistoryRepository) {}
  execute(userId: string, eventId: string): Promise<DoorEventOutData> {
    return this.deleteFromHistoryRepo.deleteEvent(userId, eventId);
  }
}
