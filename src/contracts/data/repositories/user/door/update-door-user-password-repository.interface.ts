import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IUpdateDoorUserPasswordRepository {
  updatePassword(doorId: string, newPassword: string): Promise<DoorUserOutData>;
}
