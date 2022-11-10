import { IDoorOwnerUserDataSource } from '../../../../../contracts/data/data-sources/door-owner-data-source-interface';
import { DeleteDoorOwnerUserRepository } from '../../../../../data/repositories-imp/users/doorOwner/delete-door-owner-user-repository';
import { DoorOwnerUserOutData } from '../../../../../entities/dtos/user/door-owner-user/door-owner-user-output-data';
import { doorOwnerUserOutDataStunt } from '../../../../../test/fixtures/user-fixture';

describe('delete the door owner user repository', () => {
  let mockedDoorOwnerDataSource: IDoorOwnerUserDataSource;
  let ownerOutData: DoorOwnerUserOutData;
  let deleteDoorOwnerRepo: DeleteDoorOwnerUserRepository;
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
    deleteDoorOwnerRepo = new DeleteDoorOwnerUserRepository(
      mockedDoorOwnerDataSource,
    );
  });

  it('deletes the door owner using the door owner data source', async () => {
    await deleteDoorOwnerRepo.deleteUser(ownerId);
    expect(mockedDoorOwnerDataSource.deleteDoorOwnerUserById).toBeCalledWith(
      ownerId,
    );
  });

  it('returns the deleted door owner', async () => {
    const expectedResult =
      await mockedDoorOwnerDataSource.deleteDoorOwnerUserById(ownerId);
    const result = await deleteDoorOwnerRepo.deleteUser(ownerId);

    expect(result).toEqual(expectedResult);
  });
});
