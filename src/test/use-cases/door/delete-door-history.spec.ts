import { IAddToHistoryRepository } from 'src/contracts/data/repositories/history/add-to-history-repository.interface';
import { IDeleteFromHistoryRepository } from 'src/contracts/data/repositories/history/delete-from-history-repository.interface';
import { IDoorHistoryEntity } from 'src/contracts/entities/door-history.interface';
import { DeleteDoorHistoryUseCase } from 'src/interactors/use-cases/door/delete-door-history-use-case';
import { DoorEventData } from 'src/test/fixtures/event-input-data-fixture';

describe('delete door history', () => {
  let useCase: DeleteDoorHistoryUseCase;
  let doorEventData: DoorEventData;

  let mockedHistoryEntity: IDoorHistoryEntity;
  let mockedDeleteFromHistoryRepository: IDeleteFromHistoryRepository;

  mockedHistoryEntity;

  beforeEach(() => {
    doorEventData = new DoorEventData();

    mockedHistoryEntity = {
      getOutData: jest.fn(() => doorEventData.calculateDoorEventData()),
    };
    mockedDeleteFromHistoryRepository = {
      deleteEvent: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
    };
  });
});
