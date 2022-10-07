import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerPasswordRepository {
  updatePassword(
    ownerId: string,
    newPassword: string,
  ): Promise<DoorOwnerUserOutData>;
}
