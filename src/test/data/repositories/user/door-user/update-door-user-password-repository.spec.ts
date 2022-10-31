import { UpdateDoorUserPasswordRepository } from '../../../../../data/repositories-imp/users/door/update-door-user-password-repository';
import { doorUserOutDataStunt } from '../../../../../test/fixtures/user-fixture';
import { IPasswordHasher } from '../../../../../contracts/base/hasher/password-hasher.interface';
import { IDoorUserDataSource } from '../../../../../contracts/data/data-sources/door-user-data-source.interface';
import { DoorUserOutData } from '../../../../../entities/dtos/user/door-user/door-user-output';

describe('update the doors password repository implementation', () => {
  let mockedPasswordHasher: IPasswordHasher;
  let mockedDoorDataSource: IDoorUserDataSource;
  let updatePasswordRepository: UpdateDoorUserPasswordRepository;
  let doorOutData: DoorUserOutData;

  const newPassword = 'not encrypted password';

  beforeEach(() => {
    doorOutData = structuredClone(doorUserOutDataStunt);
    mockedPasswordHasher = {
      hash: jest.fn(() => Promise.resolve('__encrypted password__')),
    };

    mockedDoorDataSource = {
      createDoorUser: jest.fn(() => Promise.resolve(doorOutData)),
      getDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
      deleteDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
      updateDoorUserById: jest.fn(() => Promise.resolve(doorOutData)),
    };

    updatePasswordRepository = new UpdateDoorUserPasswordRepository(
      mockedPasswordHasher,
      mockedDoorDataSource,
    );
  });

  it('gets the door from the data source', async () => {
    await updatePasswordRepository.updatePassword(doorOutData.id, newPassword);
    expect(mockedDoorDataSource.getDoorUserById).toBeCalledWith(doorOutData.id);
  });

  it('hashes the password with the password hasher', async () => {
    await updatePasswordRepository.updatePassword(doorOutData.id, newPassword);
    expect(mockedPasswordHasher.hash).toBeCalledWith(newPassword);
  });

  it('update the doors password with the hashed password', async () => {
    const hashedPassword = await mockedPasswordHasher.hash(newPassword);
    const expectedUpdateObject = structuredClone(doorOutData);
    expectedUpdateObject.password = hashedPassword;

    await updatePasswordRepository.updatePassword(doorOutData.id, newPassword);

    expect(mockedDoorDataSource.updateDoorUserById).toBeCalledWith(
      doorOutData.id,
      expectedUpdateObject,
    );
  });

  it('return the updated door', async () => {
    const hashedPassword = await mockedPasswordHasher.hash(newPassword);
    const expectedResult = structuredClone(doorOutData);
    expectedResult.password = hashedPassword;

    const result = await updatePasswordRepository.updatePassword(
      doorOutData.id,
      newPassword,
    );

    expect(result).toEqual(expectedResult);
  });
});
