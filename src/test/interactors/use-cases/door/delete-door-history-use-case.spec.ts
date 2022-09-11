import { IDeleteFromHistoryRepository } from '../../../../contracts/data/repositories/history/delete-from-history-repository.interface';
import { IDoorHistoryEntity } from '../../../../contracts/entities/door-history.interface';
import { DeleteDoorHistoryUseCase } from '../../../../interactors/use-cases/door/delete-door-history-use-case';
import { DoorEventData } from '../../../fixtures/event-input-data-fixture';
import { doorUserStunt } from '../../../fixtures/user-fixture';

describe('delete door history', () => {
  let useCase: DeleteDoorHistoryUseCase;
  let doorEventData: DoorEventData;

  let mockedHistoryEntity: IDoorHistoryEntity;
  let mockedDeleteFromHistoryRepository: IDeleteFromHistoryRepository;

  mockedHistoryEntity;

  beforeEach(() => {
    doorEventData = new DoorEventData();

    mockedDeleteFromHistoryRepository = {
      deleteEvent: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
    };
    useCase = new DeleteDoorHistoryUseCase(mockedDeleteFromHistoryRepository);
  });

  it('delete the event using the repository', async () => {
    const doorEventId = doorEventData.calculateDoorEventOutputData().id;

    await useCase.execute(doorUserStunt.id, doorEventId);

    expect(mockedDeleteFromHistoryRepository.deleteEvent).toBeCalledWith(
      doorEventId,
    );
  });

  it('returns the deleted event', async () => {
    const expectedDeletedDoorEvent =
      doorEventData.calculateDoorEventOutputData();

    const doorEventId = expectedDeletedDoorEvent.id;
    const result = await useCase.execute(doorUserStunt.id, doorEventId);

    expect(result).toEqual(expectedDeletedDoorEvent);
  });
});