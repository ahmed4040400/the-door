import { UseCase } from 'src/base/use-case.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerPasswordUseCase extends UseCase {
  execute(
    ownerUserId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<DoorOwnerUserOutData>;
}
