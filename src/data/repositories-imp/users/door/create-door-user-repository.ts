import { IPasswordHasher } from 'src/contracts/base/hasher/password-hasher.interface';
import { IDoorOwnerUserDataSource } from 'src/contracts/data/data-sources/door-owner-data-source-interface';
import { IDoorUserDataSource } from 'src/contracts/data/data-sources/door-user-data-source.interface';
import { ICreateDoorUserRepository } from 'src/contracts/data/repositories/user/door/create-door-user-repository.interface';
import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

// TODO : use password hasher to hash the password before storing in the db for any password saving
export class CreateDoorUserRepository implements ICreateDoorUserRepository {
  constructor(
    private doorDataSource: IDoorUserDataSource,
    private doorOwnerDataSource: IDoorOwnerUserDataSource,
    private passwordHasher: IPasswordHasher,
  ) {}
  async createUser(
    ownerId: string,
    doorUserData: DoorUser,
  ): Promise<DoorUserOutData> {
    const doorOwner = await this.doorOwnerDataSource.getDoorOwnerUserById(
      ownerId,
    );
    const hashedPassword = await this.passwordHasher.hash(
      doorUserData.password,
    );

    const doorUserDataWithHashedPassword = structuredClone(doorUserData);
    doorUserDataWithHashedPassword.password = hashedPassword;

    const createdDoor = await this.doorDataSource.createDoorUser(
      doorUserDataWithHashedPassword,
    );

    const OwnerDoors = doorOwner.doors;
    OwnerDoors.push(createdDoor.id);

    this.doorOwnerDataSource.updateDoorOwnerUserById(ownerId, {
      doors: OwnerDoors,
    });

    return createdDoor;
  }
}
