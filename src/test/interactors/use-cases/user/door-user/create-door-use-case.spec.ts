import { ICreateDoorUserRepository } from '../../../../../contracts/data/repositories/user/door/create-door-user-repository.interface';
import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
  doorUserStunt,
} from '../../../../fixtures/user-fixture';

import { CreateDoorUserUseCase } from '../../../../../interactors/use-cases/user/door-user/create-door-use-case';
import { IDoorUserValidator } from '../../../../../contracts/interactors/validators/user/door/door-user-validator.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';

describe('create a door user use case', () => {
  let mockedCreateDoorUserRepository: ICreateDoorUserRepository;
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let mockedDoorUserValidator: IDoorUserValidator;

  let createDoorOwnerUserUseCase: CreateDoorUserUseCase;

  beforeEach(() => {
    mockedCreateDoorUserRepository = {
      createUser: jest.fn(() => Promise.resolve(doorUserOutDataStunt)),
    };
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedDoorUserValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };

    createDoorOwnerUserUseCase = new CreateDoorUserUseCase(
      mockedCreateDoorUserRepository,
      mockedIsDoorOwnerAuthorizer,
      mockedDoorUserValidator,
    );
  });

  it('calls the validator to validate the provided user data before creating a user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const userToCreate = doorUserStunt;

    await createDoorOwnerUserUseCase.execute(ownerId, userToCreate);

    expect(mockedDoorUserValidator.validate).toBeCalledWith(userToCreate);
  });

  it('calls the authorizer to authorize that the door owner is a door owner user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const userToCreate = doorUserStunt;

    await createDoorOwnerUserUseCase.execute(ownerId, userToCreate);

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });
  it('call the create repo to create a new user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const userToCreate = doorUserStunt;

    await createDoorOwnerUserUseCase.execute(ownerId, userToCreate);

    expect(mockedCreateDoorUserRepository.createUser).toBeCalledWith(
      ownerId,
      userToCreate,
    );
  });

  it('return the created door user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;
    const userToCreate = doorUserStunt;

    const expectedResult = await mockedCreateDoorUserRepository.createUser(
      ownerId,
      userToCreate,
    );

    const result = await createDoorOwnerUserUseCase.execute(
      ownerId,
      userToCreate,
    );

    expect(result).toEqual(expectedResult);
  });
});
