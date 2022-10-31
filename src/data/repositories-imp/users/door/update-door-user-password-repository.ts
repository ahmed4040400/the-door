import { IPasswordHasher } from 'src/contracts/base/hasher/password-hasher.interface';
import { IDoorUserDataSource } from 'src/contracts/data/data-sources/door-user-data-source.interface';
import { IUpdateDoorUserPasswordRepository } from 'src/contracts/data/repositories/user/door/update-door-user-password-repository.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class UpdateDoorUserPasswordRepository
  implements IUpdateDoorUserPasswordRepository
{
  constructor(
    private passwordHasher: IPasswordHasher,
    private doorDataSource: IDoorUserDataSource,
  ) {}
  async updatePassword(
    doorId: string,
    newPassword: string,
  ): Promise<DoorUserOutData> {
    const door = await this.doorDataSource.getDoorUserById(doorId);
    const hashedNewPassword = await this.passwordHasher.hash(newPassword);

    door.password = hashedNewPassword;

    await this.doorDataSource.updateDoorUserById(doorId, door);
    return door;
  }
}
