import { IDoorOwnerUserDataSource } from 'src/contracts/data/data-sources/door-owner-data-source-interface';
import { IUpdateDoorOwnerEmailRepository } from 'src/contracts/data/repositories/user/door-owner/update-door-owner-email-repository.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class UpdateDoorOwnerEmailRepository
  implements IUpdateDoorOwnerEmailRepository
{
  constructor(private doorOwnerDataSource: IDoorOwnerUserDataSource) {}
  async updateEmail(
    ownerId: string,
    newEmail: string,
  ): Promise<DoorOwnerUserOutData> {
    const ownerData = await this.doorOwnerDataSource.getDoorOwnerUserById(
      ownerId,
    );
    ownerData.email = newEmail;

    return this.doorOwnerDataSource.updateDoorOwnerUserById(ownerId, ownerData);
  }
}
