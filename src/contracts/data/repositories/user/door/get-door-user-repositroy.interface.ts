import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IGetDoorUserRepository {
  getUser(userId: string): Promise<DoorUserOutData>;
}
