import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
} from '../../../../fixtures/user-fixture';

import { IUpdateDoorUsernameRepository } from '../../../../../contracts/data/repositories/user/door/update-door-user-username-repository.interface';
import { IDoorUsernameValidator } from '../../../../../contracts/interactors/validators/user/door/door-username-validator.interface';
import { UpdateDoorUsernameUseCase } from '../../../../../interactors/use-cases/user/door-user/update-door-username-use-case';
import { IDoorBelongsToOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IDoorUsernameIsUniqueAuthorizer } from '../../../../../contracts/interactors/authorizers/door-username-is-unique-authorizer.interface';

describe('update a door user use case', () => {
  let mockedUpdateDoorUsernameRepository: IUpdateDoorUsernameRepository;
  let mockedDoorBelongsToOwnerAuthorizer: IDoorBelongsToOwnerAuthorizer;
  let mockedDoorUsernameValidator: IDoorUsernameValidator;
  let mockedDoorUsernameIsUniqueAuthorizer: IDoorUsernameIsUniqueAuthorizer;
  let updateDoorUserUseCase: UpdateDoorUsernameUseCase;

  beforeEach(() => {
    mockedUpdateDoorUsernameRepository = {
      updateUsername: jest.fn(() => Promise.resolve(doorUserOutDataStunt)),
    };
    mockedDoorBelongsToOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedDoorUsernameValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };
    mockedDoorUsernameIsUniqueAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    updateDoorUserUseCase = new UpdateDoorUsernameUseCase(
      mockedUpdateDoorUsernameRepository,
      mockedDoorBelongsToOwnerAuthorizer,
      mockedDoorUsernameIsUniqueAuthorizer,
      mockedDoorUsernameValidator,
    );
  });

  it('calls the validator to validate the provided username before updating', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const doorId = doorUserOutDataStunt.id;
    const newUsername = 'newUserName';

    await updateDoorUserUseCase.execute(ownerId, doorId, newUsername);

    expect(mockedDoorUsernameValidator.validate).toBeCalledWith(newUsername);
  });

  it('authorize the owner actually owns the door to update', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const doorId = doorUserOutDataStunt.id;
    const newUsername = 'newUserName';

    await updateDoorUserUseCase.execute(ownerId, doorId, newUsername);

    expect(mockedDoorBelongsToOwnerAuthorizer.authorize).toBeCalledWith(
      ownerId,
      doorId,
    );
  });

  it('calls the usernameIsUnique authorizer to confirm uniquity', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const doorId = doorUserOutDataStunt.id;
    const newUsername = 'newUserName';

    await updateDoorUserUseCase.execute(ownerId, doorId, newUsername);
    expect(mockedDoorUsernameIsUniqueAuthorizer.authorize).toBeCalledWith(
      newUsername,
    );
  });

  it('call the update repo to update the username', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const doorId = doorUserOutDataStunt.id;
    const newUsername = 'newUserName';

    await updateDoorUserUseCase.execute(ownerId, doorId, newUsername);

    expect(mockedUpdateDoorUsernameRepository.updateUsername).toBeCalledWith(
      doorId,
      newUsername,
    );
  });

  it('return the updated door user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const doorId = doorUserOutDataStunt.id;
    const newUsername = 'newUserName';

    const expectedResult =
      await mockedUpdateDoorUsernameRepository.updateUsername(
        doorId,
        newUsername,
      );

    const result = await updateDoorUserUseCase.execute(
      ownerId,
      doorId,
      newUsername,
    );

    expect(result).toEqual(expectedResult);
  });
});
