import { ICreateDoorOwnerUserRepository } from '../../../../../contracts/data/repositories/user/door-owner/create-door-owner-user-repository.interface';
import { CreateDoorOwnerUserUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/create-door-owner-use-case';
import {
  doorOwnerUserOutDataStunt,
  doorOwnerUserStunt,
} from '../../../../fixtures/user-fixture';

import { IDoorOwnerUserValidator } from '../../../../../contracts/interactors/validators/user/door-owner/door-owner-user-validator.interface';

describe('create a door owner user use case', () => {
  let mockedCreateDoorOwnerUserRepository: ICreateDoorOwnerUserRepository;
  let mockedDoorOwnerUserValidator: IDoorOwnerUserValidator;
  let createDoorOwnerUserUseCase: CreateDoorOwnerUserUseCase;

  beforeEach(() => {
    mockedCreateDoorOwnerUserRepository = {
      createUser: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };
    mockedDoorOwnerUserValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };

    createDoorOwnerUserUseCase = new CreateDoorOwnerUserUseCase(
      mockedCreateDoorOwnerUserRepository,
      mockedDoorOwnerUserValidator,
    );
  });

  it('calls the validator to validate the provided user data before creating a user', async () => {
    const userToCreate = doorOwnerUserStunt;

    await createDoorOwnerUserUseCase.execute(userToCreate);

    expect(mockedDoorOwnerUserValidator.validate).toBeCalledWith(userToCreate);
  });

  it('call the create repo to create a new user', async () => {
    const userToCreate = doorOwnerUserStunt;

    await createDoorOwnerUserUseCase.execute(userToCreate);

    expect(mockedCreateDoorOwnerUserRepository.createUser).toBeCalledWith(
      userToCreate,
    );
  });

  it('return the created door owner user', async () => {
    const userToCreate = doorOwnerUserStunt;
    const expectedResult = await mockedCreateDoorOwnerUserRepository.createUser(
      userToCreate,
    );

    const result = await createDoorOwnerUserUseCase.execute(userToCreate);

    expect(result).toEqual(expectedResult);
  });
});
