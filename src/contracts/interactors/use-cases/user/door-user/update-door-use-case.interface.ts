import { UseCase } from 'src/base/use-case.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IUpdateDoorUsernameUseCase extends UseCase {
  execute(
    ownerId: string,
    doorId: string,
    newUsername: string,
  ): Promise<DoorUserOutData>;
}
