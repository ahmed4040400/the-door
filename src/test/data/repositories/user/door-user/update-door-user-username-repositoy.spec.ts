import { IDoorUserDataSource } from '../../../../../contracts/data/data-sources/door-user-data-source.interface';
import { UpdateDoorUsernameRepository } from '../../../../../data/repositories-imp/users/door/update-door-user-username-repository';
import { doorUserOutDataStunt } from '../../../../fixtures/user-fixture';

describe('update the door users username repository', () => {
  let mockedDoorDataSource: IDoorUserDataSource;
  let updateDoorUsernameRepo: UpdateDoorUsernameRepository;
  let doorOutData;

  beforeEach(() => {
    doorOutData = structuredClone(doorUserOutDataStunt);

    mockedDoorDataSource = {
      createDoorUser: jest.fn(() => Promise.resolve(doorOutData)),
      getDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
      deleteDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
      updateDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
    };
    updateDoorUsernameRepo = new UpdateDoorUsernameRepository(
      mockedDoorDataSource,
    );
  });
  it('gets the door user using the door data source', async () => {
    const newUsername = 'newUpdatedUserName';
    await updateDoorUsernameRepo.updateUsername(doorOutData.id, newUsername);
    expect(mockedDoorDataSource.getDoorUserById).toBeCalledWith(doorOutData.id);
  });

  it('updates the doors username with the data source', async () => {
    const newUsername = 'newUpdatedUserName';
    const expectedUpdateObject = structuredClone(doorOutData);
    expectedUpdateObject.username = newUsername;

    await updateDoorUsernameRepo.updateUsername(doorOutData.id, newUsername);
    expect(mockedDoorDataSource.updateDoorUserById).toBeCalledWith(
      doorOutData.id,
      expectedUpdateObject,
    );
  });

  it('returns the updated door', async () => {
    const newUsername = 'newUpdatedUserName';

    const expectedUpdateObject = structuredClone(doorOutData);
    expectedUpdateObject.username = newUsername;

    const expectedResult = await mockedDoorDataSource.updateDoorUserById(
      doorOutData.id,
      expectedUpdateObject,
    );

    const result = await updateDoorUsernameRepo.updateUsername(
      doorOutData.id,
      newUsername,
    );

    expect(result).toEqual(expectedResult);
  });
});
