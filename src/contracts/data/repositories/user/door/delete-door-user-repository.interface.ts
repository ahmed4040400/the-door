import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IDeleteDoorUserRepository {
  deleteDoorUser(ownerId: string, doorId: string): Promise<DoorUserOutData>;
}
