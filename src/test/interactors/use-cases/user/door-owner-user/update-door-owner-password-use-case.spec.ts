import { IUpdateDoorOwnerPasswordRepository } from '../../../../../contracts/data/repositories/user/door-owner/update-door-owner-password-repository.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { ISamePasswordAuthorizer } from '../../../../../contracts/interactors/authorizers/same-password-authorizer.interface';
import { UpdateDoorOwnerPasswordUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/update-door-owner-password-use-case';
import { doorOwnerUserOutDataStunt } from '../../../../fixtures/user-fixture';

describe('update a door owner password use case', () => {
  let mockedSamePasswordAuthorizer: ISamePasswordAuthorizer;
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let mockedUpdateOwnerPasswordRepository: IUpdateDoorOwnerPasswordRepository;

  let updatePasswordUseCase: UpdateDoorOwnerPasswordUseCase;

  const ownerId = doorOwnerUserOutDataStunt.id;
  const oldPassword = 'testOldPassword';
  const newPassword = 'testNewPassword';

  beforeEach(() => {
    mockedSamePasswordAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    mockedUpdateOwnerPasswordRepository = {
      updatePassword: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };
    updatePasswordUseCase = new UpdateDoorOwnerPasswordUseCase(
      mockedSamePasswordAuthorizer,
      mockedIsDoorOwnerAuthorizer,
      mockedUpdateOwnerPasswordRepository,
    );
  });

  it('authorize the oldPassword is the same password', async () => {
    await updatePasswordUseCase.execute(ownerId, oldPassword, newPassword);
    expect(mockedSamePasswordAuthorizer.authorize).toBeCalledWith(
      oldPassword,
      newPassword,
    );
  });

  it('authorize the user is a door owner', async () => {
    await updatePasswordUseCase.execute(ownerId, oldPassword, newPassword);
    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('update the password with the repository', async () => {
    await updatePasswordUseCase.execute(ownerId, oldPassword, newPassword);
    expect(mockedUpdateOwnerPasswordRepository.updatePassword).toBeCalledWith(
      ownerId,
      newPassword,
    );
  });

  it('returns the updated user', async () => {
    const expectedResult =
      await mockedUpdateOwnerPasswordRepository.updatePassword(
        ownerId,
        newPassword,
      );
    const result = await updatePasswordUseCase.execute(
      ownerId,
      oldPassword,
      newPassword,
    );
    expect(result).toEqual(expectedResult);
  });
});
