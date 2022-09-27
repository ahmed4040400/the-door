import { doorOwnerUserOutDataStunt } from '../../../../fixtures/user-fixture';

import { IDeleteDoorOwnerUserRepository } from '../../../../../contracts/data/repositories/user/door-owner/delete-door-owner-repository.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { DeleteDoorOwnerUserUseCase } from '../../../../../interactors/use-cases/user/door-owner-user/delete-door-owner-use-case';

describe('delete a door owner user use case', () => {
  let mockedDeleteDoorOwnerUserRepository: IDeleteDoorOwnerUserRepository;
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let deleteDoorOwnerUserUseCase: DeleteDoorOwnerUserUseCase;

  beforeEach(() => {
    mockedDeleteDoorOwnerUserRepository = {
      deleteUser: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    deleteDoorOwnerUserUseCase = new DeleteDoorOwnerUserUseCase(
      mockedDeleteDoorOwnerUserRepository,
      mockedIsDoorOwnerAuthorizer,
    );
  });

  it('calls the authorizer to authorize the user before deleting the user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;

    await deleteDoorOwnerUserUseCase.execute(ownerId);

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('call the delete repo to delete the owner user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;

    await deleteDoorOwnerUserUseCase.execute(ownerId);

    expect(mockedDeleteDoorOwnerUserRepository.deleteUser).toBeCalledWith(
      ownerId,
    );
  });

  it('returns the door deleted owner user', async () => {
    const ownerId = doorOwnerUserOutDataStunt.id;

    const expectedResult = await mockedDeleteDoorOwnerUserRepository.deleteUser(
      ownerId,
    );

    const result = await deleteDoorOwnerUserUseCase.execute(ownerId);

    expect(result).toEqual(expectedResult);
  });
});
