import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IUpdateDoorUsernameRepository {
  updateUsername(doorId: string, newUsername: string): Promise<DoorUserOutData>;
}
