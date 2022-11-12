import { GetDoorOwnerUserRepository } from '../../../../../data/repositories-imp/users/doorOwner/get-door-owner-user-repository';
import { doorOwnerUserOutDataStunt } from '../../../../../test/fixtures/user-fixture';
import { IDoorOwnerUserDataSource } from '../../../../../contracts/data/data-sources/door-owner-data-source-interface';

describe('get the door owner user repository', () => {
  let mockedDoorOwnerDataSource: IDoorOwnerUserDataSource;
  let getDoorOwnerRepo: GetDoorOwnerUserRepository;
  let ownerOutData;
  let ownerId;
  beforeEach(() => {
    ownerOutData = doorOwnerUserOutDataStunt;

    ownerId = ownerOutData.id;
    mockedDoorOwnerDataSource = {
      createDoorOwnerUser: jest.fn(() => Promise.resolve(ownerOutData)),
      getDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
      deleteDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
      updateDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
    };
    getDoorOwnerRepo = new GetDoorOwnerUserRepository(
      mockedDoorOwnerDataSource,
    );
  });

  it('calls the data source get function to get the owner', async () => {
    await getDoorOwnerRepo.getUser(ownerId);
    expect(mockedDoorOwnerDataSource.getDoorOwnerUserById).toBeCalledWith(
      ownerId,
    );
  });

  it('return the retrieved owner form the data source', async () => {
    const expectedResult = await mockedDoorOwnerDataSource.getDoorOwnerUserById(
      ownerId,
    );
    const result = await getDoorOwnerRepo.getUser(ownerId);

    expect(result).toEqual(expectedResult);
  });
});
