import { UseCase } from 'src/base/use-case.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IUpdateDoorUserPasswordUseCase extends UseCase {
  execute(
    ownerId: string,
    doorId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<DoorUserOutData>;
}
