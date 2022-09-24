import { UseCase } from 'src/base/use-case.interface';
import { DoorActionData } from 'src/entities/dtos/door-action/door-action';

export interface IMoveDoorUseCase extends UseCase {
  execute(
    doorOwnerId: string,
    doorId: string,
    angleToMoveTo: number,
  ): Promise<DoorActionData>;
}
