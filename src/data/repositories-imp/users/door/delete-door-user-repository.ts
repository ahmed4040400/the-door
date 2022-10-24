import { IDoorOwnerUserDataSource } from 'src/contracts/data/data-sources/door-owner-data-source-interface';
import { IDoorUserDataSource } from 'src/contracts/data/data-sources/door-user-data-source.interface';
import { IDeleteDoorUserRepository } from 'src/contracts/data/repositories/user/door/delete-door-user-repository.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class DeleteDoorUserRepository implements IDeleteDoorUserRepository {
  constructor(
    private doorUserDataSource: IDoorUserDataSource,
    private doorOwnerUserDataSource: IDoorOwnerUserDataSource,
  ) {}
  async deleteDoorUser(
    ownerId: string,
    doorId: string,
  ): Promise<DoorUserOutData> {
    const doorOwner = await this.doorOwnerUserDataSource.getDoorOwnerUserById(
      ownerId,
    );

    removeSpecificValueFromArray();
    this.doorOwnerUserDataSource.updateDoorOwnerUserById(ownerId, doorOwner);

    const deletedDoor = await this.doorUserDataSource.deleteDoorUserById(
      doorId,
    );

    function removeSpecificValueFromArray() {
      const index = doorOwner.doors.indexOf(doorId);

      if (index > -1) {
        return doorOwner.doors.splice(index, 1);
      }
    }
    return deletedDoor;
  }
}
