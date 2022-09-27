import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IUpdateDoorUsernameRepository {
  createUser(ownerId: string, newUsername: string): Promise<DoorUserOutData>;
}
