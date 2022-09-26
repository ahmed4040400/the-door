import { IUpdateDoorOwnerUserRepository } from '../../../../../contracts/data/repositories/user/door-owner/update-door-owner-user-repository.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../..//contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IDoorOwnerUserPartialValidator } from '../../../../../contracts/interactors/validators/user/door-owner/door-owner-user-partial-validator.interface';
import { UpdateDoorOwnerUserUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/update-door-owner-use-case';
import { doorOwnerUserOutDataStunt } from '../../../../../test/fixtures/user-fixture';

describe('update a door owner user use case', () => {
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let mockedDoorOwnerPartialValidator: IDoorOwnerUserPartialValidator;
  let mockedUpdateDoorOwnerRepository: IUpdateDoorOwnerUserRepository;
  let updateDoorOwnerUseCase: UpdateDoorOwnerUserUseCase;

  beforeEach(() => {
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    mockedDoorOwnerPartialValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };
    mockedUpdateDoorOwnerRepository = {
      updateUser: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };

    updateDoorOwnerUseCase = new UpdateDoorOwnerUserUseCase(
      mockedUpdateDoorOwnerRepository,
      mockedIsDoorOwnerAuthorizer,
      mockedDoorOwnerPartialValidator,
    );
  });

  it('authorizes the user for update', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const updateData = {
      email: 'test@saghsl;dkg.coisn',
    };

    await updateDoorOwnerUseCase.execute(ownerId, updateData);

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('validates the new owner data', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const updateData = {
      email: 'test@saghsl;dkg.coisn',
    };

    await updateDoorOwnerUseCase.execute(ownerId, updateData);

    expect(mockedDoorOwnerPartialValidator.validate).toBeCalledWith(updateData);
  });

  it('updates the user with the repository', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const updateData = {
      email: 'test@saghsl;dkg.coisn',
    };

    await updateDoorOwnerUseCase.execute(ownerId, updateData);

    expect(mockedUpdateDoorOwnerRepository.updateUser).toBeCalledWith(
      ownerId,
      updateData,
    );
  });
  it('returns the updated user from the repository', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const updateData = {
      email: 'test@saghsl;dkg.coisn',
    };
    const expectedResult = await mockedUpdateDoorOwnerRepository.updateUser(
      ownerId,
      updateData,
    );

    const result = await updateDoorOwnerUseCase.execute(ownerId, updateData);

    expect(result).toEqual(expectedResult);
  });
});
