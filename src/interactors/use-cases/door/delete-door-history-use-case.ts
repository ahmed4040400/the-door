import { IDeleteHistoryUseCase } from 'src/contracts/use-cases/door/delete-door-history-use-case.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export class DeleteDoorHistoryUseCase implements IDeleteHistoryUseCase {
  execute(): Promise<DoorEventOutData> {
    throw new Error('Method not implemented.');
  }
}
