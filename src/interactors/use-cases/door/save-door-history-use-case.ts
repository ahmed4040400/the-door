import { IAddToHistoryRepository } from '../../../contracts/data/repositories/history/add-to-history-repository.interface';
import { DoorEventOutData } from '../../../entities/dtos/door-event/door-event-output';
import { IDoorHistoryEntity } from '../../../contracts/entities/door-history.interface';
import { ISaveDoorHistoryUseCase } from '../../../contracts/interactors/use-cases/door/save-door-history-use-case.interface';
import { DoorEventInData } from '../../../entities/dtos/door-event/door-event-input';
import { IDoorHistoryValidator } from 'src/contracts/interactors/validators/door-history-validator.interface';

export class SaveHistoryUseCase implements ISaveDoorHistoryUseCase {
  constructor(
    private doorHistoryEntity: IDoorHistoryEntity,
    private addToHistoryRepo: IAddToHistoryRepository,
    private doorHistoryValidator: IDoorHistoryValidator,
  ) {}

  execute(
    userId: string,
    doorEvent: DoorEventInData,
  ): Promise<DoorEventOutData> {
    const valid = this.doorHistoryValidator.validate(doorEvent);
    if (valid) {
      const doorEventReadyToSave = this.doorHistoryEntity.getOutData(doorEvent);
      return this.addToHistoryRepo.addEvent(userId, doorEventReadyToSave);
    }
  }
}
