import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';

export interface IGetDoorOwnerUserRepository {
  getUser(userId: string): Promise<DoorOwnerUser>;
}
