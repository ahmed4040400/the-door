import { IDoorBelongsToOwnerAuthorizer } from 'src/contracts/interactors/authorizers/door-belongs-to-user-authorizer.interface';
import { IDeleteFromHistoryRepository } from '../../../../contracts/data/repositories/history/delete-from-history-repository.interface';
import { IDoorHistoryEntity } from '../../../../contracts/entities/door-history.interface';
import { DeleteDoorHistoryUseCase } from '../../../../interactors/use-cases/door/delete-door-history-use-case';
import { DoorEventData } from '../../../fixtures/event-input-data-fixture';
import { doorOwnerUserOutDataStunt } from '../../../fixtures/user-fixture';

describe('delete door history', () => {
  let useCase: DeleteDoorHistoryUseCase;
  let doorEventData: DoorEventData;

  let mockedHistoryEntity: IDoorHistoryEntity;
  let mockedDeleteFromHistoryRepository: IDeleteFromHistoryRepository;

  let mockedDoorHistoryAuthorizer: IDoorBelongsToOwnerAuthorizer;
  mockedHistoryEntity;

  beforeEach(() => {
    doorEventData = new DoorEventData();

    mockedDeleteFromHistoryRepository = {
      deleteEvent: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
    };

    mockedDoorHistoryAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };

    useCase = new DeleteDoorHistoryUseCase(
      mockedDeleteFromHistoryRepository,
      mockedDoorHistoryAuthorizer,
    );
  });

  it('authorize the user that trying to delete the history', async () => {
    const doorEventId = doorEventData.calculateDoorEventOutputData().id;
    const doorOwner = doorOwnerUserOutDataStunt;

    await useCase.execute(doorOwner.id, doorEventId);

    expect(mockedDoorHistoryAuthorizer.authorize).toBeCalledWith(
      doorOwner.id,
      doorEventId,
    );
  });

  it('delete the event using the repository', async () => {
    const doorEventId = doorEventData.calculateDoorEventOutputData().id;

    await useCase.execute(doorOwnerUserOutDataStunt.id, doorEventId);

    expect(mockedDeleteFromHistoryRepository.deleteEvent).toBeCalledWith(
      doorEventId,
    );
  });

  it('returns the deleted event', async () => {
    const expectedDeletedDoorEvent =
      doorEventData.calculateDoorEventOutputData();

    const doorEventId = expectedDeletedDoorEvent.id;
    const result = await useCase.execute(
      doorOwnerUserOutDataStunt.id,
      doorEventId,
    );

    expect(result).toEqual(expectedDeletedDoorEvent);
  });
});
