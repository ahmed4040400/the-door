import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from '../../../entities/dtos/user/door-user/door-user-output';

export interface IDoorUserDataSource {
  createDoorUser(doorUserData: DoorUser): Promise<DoorUserOutData>;
  getDoorUserById(id: string): Promise<DoorUserOutData>;
  deleteDoorUserById(id: string): Promise<DoorUserOutData>;
  updateUserById(
    id: string,
    doorUserObjectToUpdate: DoorUser,
  ): Promise<DoorUserOutData>;
}
