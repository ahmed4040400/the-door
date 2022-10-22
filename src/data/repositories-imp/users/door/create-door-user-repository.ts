import { IDoorOwnerUserDataSource } from 'src/contracts/data/data-sources/door-owner-data-source-interface';
import { IDoorUserDataSource } from 'src/contracts/data/data-sources/door-user-data-source.interface';
import { ICreateDoorUserRepository } from 'src/contracts/data/repositories/user/door/create-door-user-repository.interface';
import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class CreateDoorUserRepository implements ICreateDoorUserRepository {
  constructor(
    private doorDataSource: IDoorUserDataSource,
    private doorOwnerDataSource: IDoorOwnerUserDataSource,
  ) {}
  async createUser(
    ownerId: string,
    doorUserData: DoorUser,
  ): Promise<DoorUserOutData> {
    const doorOwner = await this.doorOwnerDataSource.getDoorOwnerUserById(
      ownerId,
    );

    const createdDoor = await this.doorDataSource.createDoorUser(doorUserData);

    const OwnerDoors = doorOwner.doors;
    OwnerDoors.push(createdDoor.id);

    this.doorOwnerDataSource.updateDoorOwnerUserById(ownerId, {
      doors: OwnerDoors,
    });

    return createdDoor;
  }
}
