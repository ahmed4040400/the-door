import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerUsernameRepository {
  updateUser(
    ownerId: string,
    updateData: string,
  ): Promise<DoorOwnerUserOutData>;
}
