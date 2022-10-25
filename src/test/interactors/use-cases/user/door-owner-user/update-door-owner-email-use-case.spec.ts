import { IOwnersEmailIsUniqueAuthorizer } from '../../../../../contracts/interactors/authorizers/owners-email-is-unique-authorizer.interface';
import { IUpdateDoorOwnerEmailRepository } from '../../../../../contracts/data/repositories/user/door-owner/update-door-owner-email-repository.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IEmailValidator } from '../../../../../contracts/interactors/validators/user/email-validator.interface';
import { UpdateDoorOwnerEmailUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/update-door-owner-email-use-case';
import { doorOwnerUserOutDataStunt } from '../../../../fixtures/user-fixture';

describe('update a door owner email use case', () => {
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let mockedOwnersEmailIsUnique: IOwnersEmailIsUniqueAuthorizer;
  let mockedDoorOwnerPartialValidator: IEmailValidator;
  let mockedUpdateDoorOwnerRepository: IUpdateDoorOwnerEmailRepository;
  let updateDoorOwnerUseCase: UpdateDoorOwnerEmailUseCase;

  beforeEach(() => {
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedOwnersEmailIsUnique = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedDoorOwnerPartialValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };

    mockedUpdateDoorOwnerRepository = {
      updateUsername: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };

    updateDoorOwnerUseCase = new UpdateDoorOwnerEmailUseCase(
      mockedUpdateDoorOwnerRepository,
      mockedIsDoorOwnerAuthorizer,
      mockedOwnersEmailIsUnique,
      mockedDoorOwnerPartialValidator,
    );
  });

  it('authorizes the user is owner', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newEmail = 'testNewEmail@emial.com';

    await updateDoorOwnerUseCase.execute(ownerId, newEmail);

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('authorized the provided email is unique', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newEmail = 'testNewEmail@emial.com';

    await updateDoorOwnerUseCase.execute(ownerId, newEmail);
    expect(mockedOwnersEmailIsUnique.authorize).toBeCalledWith(newEmail);
  });

  it('validates the new owner data', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newEmail = 'testNewEmail@emial.com';

    await updateDoorOwnerUseCase.execute(ownerId, newEmail);

    expect(mockedDoorOwnerPartialValidator.validate).toBeCalledWith(newEmail);
  });

  it('updates the user with the repository', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newEmail = 'testNewEmail@emial.com';

    await updateDoorOwnerUseCase.execute(ownerId, newEmail);

    expect(mockedUpdateDoorOwnerRepository.updateUsername).toBeCalledWith(
      ownerId,
      newEmail,
    );
  });

  it('returns the updated user from the repository', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const newEmail = 'testNewEmail@emial.com';

    const expectedResult = await mockedUpdateDoorOwnerRepository.updateUsername(
      ownerId,
      newEmail,
    );

    const result = await updateDoorOwnerUseCase.execute(ownerId, newEmail);

    expect(result).toEqual(expectedResult);
  });
});
