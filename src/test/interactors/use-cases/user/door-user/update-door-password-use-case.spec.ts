import { IUpdateDoorUserPasswordRepository } from '../../../../../contracts/data/repositories/user/door/update-door-user-password-repository.interface';
import { UpdateDoorUserPasswordUseCase } from '../../../../../interactors/use-cases/user/door-user/update-door-password-use-case';
import { IDoorBelongsToOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { doorUserOutDataStunt } from '../../../../fixtures/user-fixture';
import { IDoorPasswordConfirmationAuthorizer } from '../../../../../contracts/interactors/authorizers/password-confirmation-authorizer/door-user-password-confirmation-authorizer.interface';
import { IPasswordValidator } from '../../../../../contracts/interactors/validators/user/password-validator.interface';

describe('delete a door user use case', () => {
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let mockedDoorBelongsToOwnerAuthorizer: IDoorBelongsToOwnerAuthorizer;
  let mockedSamePasswordAuthorizer: IDoorPasswordConfirmationAuthorizer;
  let mockedPasswordValidator: IPasswordValidator;
  let mockedUpdateDoorUserPasswordRepository: IUpdateDoorUserPasswordRepository;
  let updatePasswordUseCase: UpdateDoorUserPasswordUseCase;
  const ownerId = doorUserOutDataStunt.ownerId;
  const doorId = doorUserOutDataStunt.id;
  const oldPassword = 'oldpassword';
  const newPassword = 'newpassword';

  beforeEach(() => {
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedDoorBelongsToOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedUpdateDoorUserPasswordRepository = {
      updatePassword: jest.fn(() => Promise.resolve(doorUserOutDataStunt)),
    };
    mockedSamePasswordAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    mockedPasswordValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };

    updatePasswordUseCase = new UpdateDoorUserPasswordUseCase(
      mockedUpdateDoorUserPasswordRepository,
      mockedIsDoorOwnerAuthorizer,
      mockedDoorBelongsToOwnerAuthorizer,
      mockedSamePasswordAuthorizer,
      mockedPasswordValidator,
    );
  });

  it('authorize the action taking user is an owner', async () => {
    await updatePasswordUseCase.execute(
      ownerId,
      doorId,
      oldPassword,
      newPassword,
    );

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('authorize the door to update is owned by the owner', async () => {
    await updatePasswordUseCase.execute(
      ownerId,
      doorId,
      oldPassword,
      newPassword,
    );
    expect(mockedDoorBelongsToOwnerAuthorizer.authorize).toBeCalledWith(
      ownerId,
      doorId,
    );
  });

  it('confirm the old password is right', async () => {
    await updatePasswordUseCase.execute(
      ownerId,
      doorId,
      oldPassword,
      newPassword,
    );
    expect(mockedSamePasswordAuthorizer.authorize).toBeCalledWith(
      doorId,
      oldPassword,
    );
  });

  it('updates the door password with the update password repository', async () => {
    await updatePasswordUseCase.execute(
      ownerId,
      doorId,
      oldPassword,
      newPassword,
    );
    expect(
      mockedUpdateDoorUserPasswordRepository.updatePassword,
    ).toBeCalledWith(doorId, newPassword);
  });

  it('validates the new password', async () => {
    await updatePasswordUseCase.execute(
      ownerId,
      doorId,
      oldPassword,
      newPassword,
    );

    expect(mockedPasswordValidator.validate).toBeCalledWith(newPassword);
  });

  it('returns the updated door user', async () => {
    const expectedResult =
      await mockedUpdateDoorUserPasswordRepository.updatePassword(
        ownerId,
        doorId,
      );
    const result = await updatePasswordUseCase.execute(
      ownerId,
      doorId,
      oldPassword,
      newPassword,
    );
    expect(result).toEqual(expectedResult);
  });
});
