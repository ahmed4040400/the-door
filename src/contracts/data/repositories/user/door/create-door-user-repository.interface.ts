import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface ICreateDoorUserRepository {
  createUser(ownerId: string, doorUserData: DoorUser): Promise<DoorUserOutData>;
}
