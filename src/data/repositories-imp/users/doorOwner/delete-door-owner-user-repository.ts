import { IDoorOwnerUserDataSource } from 'src/contracts/data/data-sources/door-owner-data-source-interface';
import { IDeleteDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/delete-door-owner-repository.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class DeleteDoorOwnerUserRepository
  implements IDeleteDoorOwnerUserRepository
{
  constructor(private doorOwnerDataSource: IDoorOwnerUserDataSource) {}
  deleteUser(ownerId: string): Promise<DoorOwnerUserOutData> {
    return this.doorOwnerDataSource.deleteDoorOwnerUserById(ownerId);
  }
}
