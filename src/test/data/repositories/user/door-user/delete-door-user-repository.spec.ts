import { IDoorOwnerUserDataSource } from '../../../../../contracts/data/data-sources/door-owner-data-source-interface';
import { IDoorUserDataSource } from '../../../../../contracts/data/data-sources/door-user-data-source.interface';
import { DeleteDoorUserRepository } from '../../../../../data/repositories-imp/users/door/delete-door-user-repository';
import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
} from '../../../../../test/fixtures/user-fixture';

describe('delete a door user repository', () => {
  let mockedDoorDataSource: IDoorUserDataSource;
  let mockedDoorOwnerDataSource: IDoorOwnerUserDataSource;

  let deleteDoorRepository: DeleteDoorUserRepository;

  let doorOutData;
  let owner;

  beforeEach(() => {
    doorOutData = structuredClone(doorUserOutDataStunt);
    owner = structuredClone(doorOwnerUserOutDataStunt);
    owner.doors.push(doorOutData.id);

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

    deleteDoorRepository = new DeleteDoorUserRepository(
      mockedDoorDataSource,
      mockedDoorOwnerDataSource,
    );
  });

  it('get the door owner using the owner data source', async () => {
    await deleteDoorRepository.deleteDoorUser(owner.id, doorOutData.id);

    expect(mockedDoorOwnerDataSource.getDoorOwnerUserById).toBeCalledWith(
      owner.id,
    );
  });

  it('deletes the door id from the owners doors list and updating the owner', async () => {
    removeSpecificValueFromArray();
    const expectedUpdateObject = structuredClone(owner);

    await deleteDoorRepository.deleteDoorUser(owner.id, doorOutData.id);

    expect(mockedDoorOwnerDataSource.updateDoorOwnerUserById).toBeCalledWith(
      owner.id,
      expectedUpdateObject,
    );

    function removeSpecificValueFromArray() {
      const index = owner.doors.indexOf(doorOutData.id);

      if (index > -1) {
        return owner.doors.splice(index, 1);
      }
    }
  });

  it('deletes the door user using the data source', async () => {
    await deleteDoorRepository.deleteDoorUser(owner.id, doorOutData.id);

    expect(mockedDoorDataSource.deleteDoorUserById).toBeCalledWith(
      doorOutData.id,
    );
  });

  it('returns the deleted door user', async () => {
    const expectedResult = await mockedDoorDataSource.deleteDoorUserById(
      doorOutData.id,
    );

    const result = await deleteDoorRepository.deleteDoorUser(
      owner.id,
      doorOutData.id,
    );

    expect(result).toEqual(expectedResult);
  });
});
