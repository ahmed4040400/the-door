import { IDoorUserDataSource } from 'src/contracts/data/data-sources/door-user-data-source.interface';
import { IUpdateDoorUsernameRepository } from 'src/contracts/data/repositories/user/door/update-door-user-username-repository.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class UpdateDoorUsernameRepository
  implements IUpdateDoorUsernameRepository
{
  constructor(private doorUserDataSource: IDoorUserDataSource) {}
  async updateUsername(
    doorId: string,
    newUsername: string,
  ): Promise<DoorUserOutData> {
    const door = await this.doorUserDataSource.getDoorUserById(doorId);
    door.username = newUsername;

    await this.doorUserDataSource.updateDoorUserById(doorId, door);
    return;
  }
}
