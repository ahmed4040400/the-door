import { IAddToHistoryRepository } from '../../../../contracts/data/repositories/history/add-to-history-repository.interface';
import { IDoorHistoryEntity } from '../../../../contracts/entities/door-history.interface';
import { SaveHistoryUseCase } from '../../../../interactors/use-cases/door/save-door-history-use-case';
import { DoorEventData } from '../../../fixtures/event-input-data-fixture';
import { doorUserStunt } from '../../../fixtures/user-fixture';

describe('save door history use case ', () => {
  let mockedHistoryEntity: IDoorHistoryEntity;
  let mockedAddToHistoryRepository: IAddToHistoryRepository;
  let useCase: SaveHistoryUseCase;
  let doorEventData: DoorEventData;
  beforeEach(async () => {
    doorEventData = new DoorEventData();
    mockedHistoryEntity = {
      getOutData: jest.fn(() => doorEventData.calculateDoorEventData()),
    };

    mockedAddToHistoryRepository = {
      addEvent: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
    };

    useCase = new SaveHistoryUseCase(
      mockedHistoryEntity,
      mockedAddToHistoryRepository,
    );
  });

  it('calls the entity for reformated data', async () => {
    const inputData = doorEventData.inputData;

    await useCase.execute(doorUserStunt.id, inputData);

    expect(mockedHistoryEntity.getOutData).toBeCalledWith(inputData);
  });

  it('save the reformated data using the repository', async () => {
    const inputData = doorEventData.inputData;
    const expectedDoorEventData = doorEventData.calculateDoorEventData();

    await useCase.execute(doorUserStunt.id, inputData);

    expect(mockedAddToHistoryRepository.addEvent).toBeCalledWith(
      doorUserStunt.id,
      expectedDoorEventData,
    );
  });

  it('returns the expected results', async () => {
    const inputData = doorEventData.inputData;
    const expectedDoorEventOutputData =
      doorEventData.calculateDoorEventOutputData();

    const result = await useCase.execute(doorUserStunt.id, inputData);
    expect(result).toEqual(expectedDoorEventOutputData);
  });
});
