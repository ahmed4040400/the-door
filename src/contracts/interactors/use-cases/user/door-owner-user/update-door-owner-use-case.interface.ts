import { UseCase } from 'src/base/use-case.interface';
import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerUserUseCase extends UseCase {
  execute(
    ownerUserId: string,
    doorOwnerUserUpdateData: Partial<DoorOwnerUser>,
  ): Promise<DoorOwnerUserOutData>;
}
