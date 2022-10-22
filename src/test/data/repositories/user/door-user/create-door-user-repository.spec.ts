import { IDoorOwnerUserDataSource } from '../../../../../contracts/data/data-sources/door-owner-data-source-interface';
import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
  doorUserStunt,
} from '../../../../fixtures/user-fixture';
import { IDoorUserDataSource } from '../../../../../contracts/data/data-sources/door-user-data-source.interface';
import { CreateDoorUserRepository } from '../../../../../data/repositories-imp/users/door/create-door-user-repository';
import { DoorOwnerUser } from '../../../../../entities/dtos/user/door-owner-user/door-owner-user';

describe('create a new door for the owner repository', () => {
  let mockedDoorDataSource: IDoorUserDataSource;
  let mockedDoorOwnerDataSource: IDoorOwnerUserDataSource;
  let createDoorUserRepository: CreateDoorUserRepository;

  let owner;
  let doorData;
  let doorOutData;

  beforeEach(() => {
    owner = structuredClone(doorOwnerUserOutDataStunt);
    doorData = structuredClone(doorUserStunt);
    doorOutData = structuredClone(doorUserOutDataStunt);

    mockedDoorDataSource = {
      createDoorUser: jest.fn(() => Promise.resolve(doorOutData)),
      getDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
      deleteDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
      updateDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
    };

    mockedDoorOwnerDataSource = {
      createDoorOwnerUser: jest.fn(() => Promise.resolve(owner)),
      getDoorOwnerUserById: jest.fn(() => Promise.resolve(owner)),
      deleteDoorOwnerUserById: jest.fn(() => Promise.resolve(owner)),
      updateDoorOwnerUserById: jest.fn(() => Promise.resolve(owner)),
    };

    createDoorUserRepository = new CreateDoorUserRepository(
      mockedDoorDataSource,
      mockedDoorOwnerDataSource,
    );
  });

  it('gets the owner with the door owner data source', async () => {
    await createDoorUserRepository.createUser(owner.id, doorData);

    expect(mockedDoorOwnerDataSource.getDoorOwnerUserById).toBeCalledWith(
      owner.id,
    );
  });

  it('creates the door user with the door data source', async () => {
    await createDoorUserRepository.createUser(owner.id, doorData);

    expect(mockedDoorDataSource.createDoorUser).toBeCalledWith(doorData);
  });

  it('add the created door id to the owners doors list', async () => {
    const expectedCreatedDoor = await mockedDoorDataSource.createDoorUser(
      doorData,
    );

    const expectedOwnerUpdateObject: Partial<DoorOwnerUser> = {
      doors: [expectedCreatedDoor.id],
    };

    await createDoorUserRepository.createUser(owner.id, doorData);

    expect(mockedDoorOwnerDataSource.updateDoorOwnerUserById).toBeCalledWith(
      owner.id,
      expectedOwnerUpdateObject,
    );
  });

  it('returns the created door object', async () => {
    const expectedCreatedDoor = await mockedDoorDataSource.createDoorUser(
      doorData,
    );
    const result = await createDoorUserRepository.createUser(
      owner.id,
      doorData,
    );
    expect(result).toEqual(expectedCreatedDoor);
  });
});
