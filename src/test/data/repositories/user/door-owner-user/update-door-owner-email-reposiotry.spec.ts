import { IDoorOwnerUserDataSource } from '../../../../../contracts/data/data-sources/door-owner-data-source-interface';
import { UpdateDoorOwnerEmailRepository } from '../../../../../data/repositories-imp/users/doorOwner/update-door-owner-email-repository';
import { DoorOwnerUserOutData } from '../../../../../entities/dtos/user/door-owner-user/door-owner-user-output-data';
import { doorOwnerUserOutDataStunt } from '../../../../../test/fixtures/user-fixture';

describe('update the door owners email repository', () => {
  let mockedDoorOwnerDataSource: IDoorOwnerUserDataSource;
  let ownerOutData: DoorOwnerUserOutData;
  let updateDoorOwnerEmail: UpdateDoorOwnerEmailRepository;
  let ownerId;

  const newEmail = 'new-email@email.com';

  beforeEach(() => {
    ownerOutData = doorOwnerUserOutDataStunt;
    ownerId = ownerOutData.id;
    mockedDoorOwnerDataSource = {
      createDoorOwnerUser: jest.fn(() => Promise.resolve(ownerOutData)),
      getDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
      deleteDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
      updateDoorOwnerUserById: jest.fn(() => Promise.resolve(ownerOutData)),
    };
    updateDoorOwnerEmail = new UpdateDoorOwnerEmailRepository(
      mockedDoorOwnerDataSource,
    );
  });

  it('gets the door owner from the data source', async () => {
    await updateDoorOwnerEmail.updateEmail(ownerId, newEmail);

    expect(mockedDoorOwnerDataSource.getDoorOwnerUserById).toBeCalledWith(
      ownerId,
    );
  });

  it('calls the updateUserById function from the data source', async () => {
    const expectedUpdateObject = structuredClone(ownerOutData);
    expectedUpdateObject.email = newEmail;

    await updateDoorOwnerEmail.updateEmail(ownerId, newEmail);

    expect(mockedDoorOwnerDataSource.updateDoorOwnerUserById).toBeCalledWith(
      ownerId,
      expectedUpdateObject,
    );
  });

  it('returns the updated owner user', async () => {
    const expectedResult = structuredClone(ownerOutData);
    expectedResult.email = newEmail;

    const result = await updateDoorOwnerEmail.updateEmail(ownerId, newEmail);

    expect(result).toEqual(expectedResult);
  });
});
