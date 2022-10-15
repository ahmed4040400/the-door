import { IDeleteDoorUserRepository } from '../../../../../contracts/data/repositories/user/door/delete-door-user-repository.interface';
import { IDoorBelongsToOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IIsDoorOwnerAuthorizer } from '../../../../../contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { DeleteDoorUserUseCase } from '../../../../../interactors/use-cases/user/door-user/delete-door-use-case';
import { doorUserOutDataStunt } from '../../../../fixtures/user-fixture';

describe('delete a door user use case', () => {
  let mockedIsDoorOwnerAuthorizer: IIsDoorOwnerAuthorizer;
  let mockedDoorBelongsToOwnerAuthorizer: IDoorBelongsToOwnerAuthorizer;
  let mockedDeleteDoorUserRepository: IDeleteDoorUserRepository;
  let deleteDoorUserUseCase: DeleteDoorUserUseCase;
  const ownerId = doorUserOutDataStunt.ownerId;
  const doorId = doorUserOutDataStunt.id;

  beforeEach(() => {
    mockedIsDoorOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    mockedDoorBelongsToOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    mockedDeleteDoorUserRepository = {
      deleteDoorUser: jest.fn(() => Promise.resolve(doorUserOutDataStunt)),
    };
    deleteDoorUserUseCase = new DeleteDoorUserUseCase(
      mockedDeleteDoorUserRepository,
      mockedIsDoorOwnerAuthorizer,
      mockedDoorBelongsToOwnerAuthorizer,
    );
  });

  it('authorize the action taking user is an owner', async () => {
    await deleteDoorUserUseCase.execute(ownerId, doorId);

    expect(mockedIsDoorOwnerAuthorizer.authorize).toBeCalledWith(ownerId);
  });

  it('authorize the door to delete is owned by the owner', async () => {
    await deleteDoorUserUseCase.execute(ownerId, doorId);

    expect(mockedDoorBelongsToOwnerAuthorizer.authorize).toBeCalledWith(
      ownerId,
      doorId,
    );
  });

  it('deletes the door user with the delete repository', async () => {
    await deleteDoorUserUseCase.execute(ownerId, doorId);
    expect(mockedDeleteDoorUserRepository.deleteDoorUser).toBeCalledWith(
      ownerId,
      doorId,
    );
  });

  it('returns the deleted door user', async () => {
    const expectedResult = await mockedDeleteDoorUserRepository.deleteDoorUser(
      ownerId,
      doorId,
    );
    const result = await deleteDoorUserUseCase.execute(ownerId, doorId);
    expect(result).toEqual(expectedResult);
  });
});
