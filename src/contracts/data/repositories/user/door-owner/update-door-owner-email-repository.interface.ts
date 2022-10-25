import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerEmailRepository {
  updateUsername(
    ownerId: string,
    newUsername: string,
  ): Promise<DoorOwnerUserOutData>;
}
