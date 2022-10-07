import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerUsernameRepository {
  updateUsername(
    ownerId: string,
    updateData: string,
  ): Promise<DoorOwnerUserOutData>;
}
