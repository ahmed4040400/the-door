import { doorOwnerUserOutDataStunt } from '../../../../fixtures/user-fixture';

import { IGetDoorOwnerUserRepository } from '../../../../../contracts/data/repositories/user/door-owner/get-door-owner-user-repository.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { GetDoorOwnerUserUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/get-door-owner-use-case';

describe('get a door owner user use case', () => {
  let mockedGetDoorOwnerUserRepository: IGetDoorOwnerUserRepository;
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let getDoorOwnerUserUseCase: GetDoorOwnerUserUseCase;

  beforeEach(() => {
    mockedGetDoorOwnerUserRepository = {
      getUser: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    getDoorOwnerUserUseCase = new GetDoorOwnerUserUseCase(
      mockedGetDoorOwnerUserRepository,
      mockedIsDoorOwnerAuthorizer,
    );
  });

  it('calls the authorizer to authorize the user before returning the data', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;

    await getDoorOwnerUserUseCase.execute(ownerId);

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('call the get repo to retrieve the owner user data', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;

    await getDoorOwnerUserUseCase.execute(ownerId);

    expect(mockedGetDoorOwnerUserRepository.getUser).toBeCalledWith(ownerId);
  });

  it('returns the door owner user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;

    const expectedResult = await mockedGetDoorOwnerUserRepository.getUser(
      ownerId,
    );

    const result = await getDoorOwnerUserUseCase.execute(ownerId);

    expect(result).toEqual(expectedResult);
  });
});
