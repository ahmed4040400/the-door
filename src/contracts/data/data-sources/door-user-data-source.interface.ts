import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from '../../../entities/dtos/user/door-user/door-user-output';

export interface IDoorUserDataSource {
  createDoorUser(doorUserData: DoorUser): Promise<DoorUserOutData>;
  getDoorUserById(id: string): Promise<DoorUserOutData>;
  deleteDoorUserById(id: string): Promise<DoorUserOutData>;
  updateDoorUserById(
    id: string,
    doorUserObjectToUpdate: Partial<DoorUser>,
  ): Promise<DoorUserOutData>;
}
// TODO:updateDoorUserById should not accept passwords in the implementation
