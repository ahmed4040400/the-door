import { IUpdateDoorOwnerUsernameRepository } from '../../../../../contracts/data/repositories/user/door-owner/update-door-owner-username-repository.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IDoorOwnerUsernameValidator } from '../../../../../contracts/interactors/validators/user/door-owner/door-owner-user-partial-validator.interface';
import { UpdateDoorOwnerUsernameUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/update-door-owner-username-use-case';
import { doorOwnerUserOutDataStunt } from '../../../../fixtures/user-fixture';

describe('update a door owner username use case', () => {
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let mockedDoorOwnerPartialValidator: IDoorOwnerUsernameValidator;
  let mockedUpdateDoorOwnerRepository: IUpdateDoorOwnerUsernameRepository;
  let updateDoorOwnerUseCase: UpdateDoorOwnerUsernameUseCase;

  beforeEach(() => {
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    mockedDoorOwnerPartialValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };
    mockedUpdateDoorOwnerRepository = {
      updateUsername: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };

    updateDoorOwnerUseCase = new UpdateDoorOwnerUsernameUseCase(
      mockedUpdateDoorOwnerRepository,
      mockedIsDoorOwnerAuthorizer,
      mockedDoorOwnerPartialValidator,
    );
  });

  it('authorizes the username for update', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newUsername = 'testusernamemadsg';

    await updateDoorOwnerUseCase.execute(ownerId, newUsername);

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('validates the new owner data', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newUsername = 'testusernamemadsg';

    await updateDoorOwnerUseCase.execute(ownerId, newUsername);

    expect(mockedDoorOwnerPartialValidator.validate).toBeCalledWith(
      newUsername,
    );
  });

  it('updates the user with the repository', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newUsername = 'testusernamemadsg';

    await updateDoorOwnerUseCase.execute(ownerId, newUsername);

    expect(mockedUpdateDoorOwnerRepository.updateUsername).toBeCalledWith(
      ownerId,
      newUsername,
    );
  });
  it('returns the updated user from the repository', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newUsername = 'testusernamemadsg';

    const expectedResult = await mockedUpdateDoorOwnerRepository.updateUsername(
      ownerId,
      newUsername,
    );

    const result = await updateDoorOwnerUseCase.execute(ownerId, newUsername);

    expect(result).toEqual(expectedResult);
  });
});
