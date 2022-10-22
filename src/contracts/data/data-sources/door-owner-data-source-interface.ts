import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IDoorOwnerUserDataSource {
  createDoorOwnerUser(
    doorUserData: DoorOwnerUser,
  ): Promise<DoorOwnerUserOutData>;
  getDoorOwnerUserById(id: string): Promise<DoorOwnerUserOutData>;
  deleteDoorOwnerUserById(id: string): Promise<DoorOwnerUserOutData>;
  updateDoorOwnerUserById(
    id: string,
    doorUserObjectToUpdate: Partial<DoorOwnerUser>,
  ): Promise<DoorOwnerUserOutData>;
}
// TODO:updateDoorOwnerUserById should not accept passwords in the implementation
