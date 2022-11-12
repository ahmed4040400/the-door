import { IDoorOwnerUserDataSource } from 'src/contracts/data/data-sources/door-owner-data-source-interface';
import { IGetDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/get-door-owner-user-repository.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class GetDoorOwnerUserRepository implements IGetDoorOwnerUserRepository {
  constructor(private doorOwnerDataSource: IDoorOwnerUserDataSource) {}
  getUser(ownerId: string): Promise<DoorOwnerUserOutData> {
    return this.doorOwnerDataSource.getDoorOwnerUserById(ownerId);
  }
}
