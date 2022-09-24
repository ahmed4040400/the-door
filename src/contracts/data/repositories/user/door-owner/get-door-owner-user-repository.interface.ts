import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IGetDoorOwnerUserRepository {
  getUser(userId: string): Promise<DoorOwnerUserOutData>;
}
