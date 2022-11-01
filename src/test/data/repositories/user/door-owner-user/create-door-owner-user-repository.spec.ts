import { IPasswordHasher } from '../../../../../contracts/base/hasher/password-hasher.interface';
import { DoorOwnerUserOutData } from '../../../../../entities/dtos/user/door-owner-user/door-owner-user-output-data';
import { IDoorOwnerUserDataSource } from '../../../../../contracts/data/data-sources/door-owner-data-source-interface';
import { CreateDoorOwnerUserRepository } from '../../../../../data/repositories-imp/users/doorOwner/create-door-owner-user-repository';
import { DoorOwnerUser } from '../../../../../entities/dtos/user/door-owner-user/door-owner-user';
import {
  doorOwnerUserOutDataStunt,
  doorOwnerUserStunt,
} from '../../../../fixtures/user-fixture';

describe('create a door owner repository', () => {
  let mockedDoorOwnerDataSource: IDoorOwnerUserDataSource;
  let mockedPasswordHasher: IPasswordHasher;
  let createOwnerRepo: CreateDoorOwnerUserRepository;
  let ownerOutData: DoorOwnerUserOutData;
  let ownerInData: DoorOwnerUser;
  beforeEach(() => {
    ownerOutData = doorOwnerUserOutDataStunt;
    ownerInData = doorOwnerUserStunt;
    mockedDoorOwnerDataSource = {
      createDoorOwnerUser: jest.fn(() => Promise.resolve(ownerOutData)),
      getDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
      deleteDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
      updateDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
    };

    mockedPasswordHasher = {
      hash: jest.fn(() => Promise.resolve('__encrypted password__')),
    };

    createOwnerRepo = new CreateDoorOwnerUserRepository(
      mockedDoorOwnerDataSource,
      mockedPasswordHasher,
    );
  });

  it('hashes the password using the password hasher', async () => {
    await createOwnerRepo.createUser(ownerInData);
    expect(mockedPasswordHasher.hash).toBeCalledWith(ownerInData.password);
  });

  it('creates the owner with the hashed password', async () => {
    const hashedPassword = await mockedPasswordHasher.hash(
      ownerInData.password,
    );

    const expectedHashedUserToCreate = structuredClone(ownerInData);
    expectedHashedUserToCreate.password = hashedPassword;

    await createOwnerRepo.createUser(ownerInData);

    expect(mockedDoorOwnerDataSource.createDoorOwnerUser).toBeCalledWith(
      expectedHashedUserToCreate,
    );
  });

  it('returns the created user', async () => {
    const expectedResult = await mockedDoorOwnerDataSource.createDoorOwnerUser(
      ownerInData,
    );
    const result = await createOwnerRepo.createUser(ownerInData);

    expect(result).toEqual(expectedResult);
  });
});
