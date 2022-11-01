import { IPasswordHasher } from 'src/contracts/base/hasher/password-hasher.interface';
import { IDoorOwnerUserDataSource } from 'src/contracts/data/data-sources/door-owner-data-source-interface';
import { ICreateDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/create-door-owner-user-repository.interface';
import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class CreateDoorOwnerUserRepository
  implements ICreateDoorOwnerUserRepository
{
  constructor(
    private doorOwnerDataSource: IDoorOwnerUserDataSource,
    private passwordHasher: IPasswordHasher,
  ) {}

  async createUser(OwnerUser: DoorOwnerUser): Promise<DoorOwnerUserOutData> {
    const hashedPassword = await this.passwordHasher.hash(OwnerUser.password);
    const hashedPasswordUser = structuredClone(OwnerUser);
    hashedPasswordUser.password = hashedPassword;

    return this.doorOwnerDataSource.createDoorOwnerUser(hashedPasswordUser);
  }
}
