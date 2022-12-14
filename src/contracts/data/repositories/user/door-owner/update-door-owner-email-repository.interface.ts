import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IUpdateDoorOwnerEmailRepository {
  updateEmail(ownerId: string, newEmail: string): Promise<DoorOwnerUserOutData>;
}
