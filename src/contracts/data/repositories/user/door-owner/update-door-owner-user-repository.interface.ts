import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerUserRepository {
  updateUser(
    ownerId: string,
    updateData: Partial<DoorOwnerUser>,
  ): Promise<DoorOwnerUserOutData>;
}
