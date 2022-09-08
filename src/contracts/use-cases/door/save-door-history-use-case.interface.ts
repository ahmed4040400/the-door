import { UseCase } from 'src/base/use-case.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';
import { DoorEventInData } from '../../../entities/dtos/door-event/door-event-input';

export interface ISaveDoorHistoryUseCase extends UseCase {
  execute(
    userId: string,
    doorEvent: DoorEventInData,
  ): Promise<DoorEventOutData>;
}
