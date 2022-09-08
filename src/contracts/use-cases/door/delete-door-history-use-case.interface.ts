import { UseCase } from 'src/base/use-case.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export interface IDeleteHistoryUseCase extends UseCase {
  execute(userId: string, eventId: string): Promise<DoorEventOutData>;
}
