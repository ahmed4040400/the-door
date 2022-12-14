import { ICreateDoorOwnerUserRepository } from '../../../../../contracts/data/repositories/user/door-owner/create-door-owner-user-repository.interface';
import { CreateDoorOwnerUserUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/create-door-owner-use-case';
import {
  doorOwnerUserOutDataStunt,
  doorOwnerUserStunt,
} from '../../../../fixtures/user-fixture';

import { IDoorOwnerUserValidator } from '../../../../../contracts/interactors/validators/user/door-owner/door-owner-user-validator.interface';
import { IOwnersEmailIsUniqueAuthorizer } from '../../../../../contracts/interactors/authorizers/owners-email-is-unique-authorizer.interface';

describe('create a door owner user use case', () => {
  let mockedCreateDoorOwnerUserRepository: ICreateDoorOwnerUserRepository;
  let mockedOwnersEmailIsUnique: IOwnersEmailIsUniqueAuthorizer;
  let mockedDoorOwnerUserValidator: IDoorOwnerUserValidator;
  let createDoorOwnerUserUseCase: CreateDoorOwnerUserUseCase;

  beforeEach(() => {
    mockedCreateDoorOwnerUserRepository = {
      createUser: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };

    mockedOwnersEmailIsUnique = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedDoorOwnerUserValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };

    createDoorOwnerUserUseCase = new CreateDoorOwnerUserUseCase(
      mockedCreateDoorOwnerUserRepository,
      mockedOwnersEmailIsUnique,
      mockedDoorOwnerUserValidator,
    );
  });

  it('authorized the email is unique', async () => {
    const userToCreate = doorOwnerUserStunt;

    await createDoorOwnerUserUseCase.execute(userToCreate);
    expect(mockedOwnersEmailIsUnique.authorize).toBeCalledWith(
      userToCreate.email,
    );
  });

  it('calls the validator to validate the provided user data before creating a user', async () => {
    const userToCreate = doorOwnerUserStunt;

    await createDoorOwnerUserUseCase.execute(userToCreate);

    expect(mockedDoorOwnerUserValidator.validate).toBeCalledWith(userToCreate);
  });

  it('calls the create repo to create a new user', async () => {
    const userToCreate = doorOwnerUserStunt;

    await createDoorOwnerUserUseCase.execute(userToCreate);

    expect(mockedCreateDoorOwnerUserRepository.createUser).toBeCalledWith(
      userToCreate,
    );
  });

  it('returns the created door owner user', async () => {
    const userToCreate = doorOwnerUserStunt;
    const expectedResult = await mockedCreateDoorOwnerUserRepository.createUser(
      userToCreate,
    );

    const result = await createDoorOwnerUserUseCase.execute(userToCreate);

    expect(result).toEqual(expectedResult);
  });
});
