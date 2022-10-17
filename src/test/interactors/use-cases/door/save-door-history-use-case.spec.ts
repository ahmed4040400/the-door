import { IDoorHistoryValidator } from 'src/contracts/interactors/validators/door-history-validator.interface';
import { IAddToHistoryRepository } from '../../../../contracts/data/repositories/history/add-to-history-repository.interface';
import { IDoorHistoryEntity } from '../../../../contracts/entities/door-history.interface';
import { SaveHistoryUseCase } from '../../../../interactors/use-cases/door/save-door-history-use-case';
import { DoorEventDataStunt } from '../../../fixtures/event-input-data-fixture';
import { doorUserOutDataStunt } from '../../../fixtures/user-fixture';

describe('save door history use case ', () => {
  let mockedHistoryEntity: IDoorHistoryEntity;
  let mockedAddToHistoryRepository: IAddToHistoryRepository;
  let mockedDoorHistoryValidator: IDoorHistoryValidator;
  let useCase: SaveHistoryUseCase;
  let doorEventData: DoorEventDataStunt;
  beforeEach(async () => {
    doorEventData = new DoorEventDataStunt();
    mockedHistoryEntity = {
      getOutData: jest.fn(() => doorEventData.calculateDoorEventData()),
    };

    mockedDoorHistoryValidator = {
      validate: jest.fn(() => Promise.resolve(true)),
    };

    mockedAddToHistoryRepository = {
      addEvent: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
    };

    useCase = new SaveHistoryUseCase(
      mockedHistoryEntity,
      mockedAddToHistoryRepository,
      mockedDoorHistoryValidator,
    );
  });

  it('calls the validator to validate the data before passing it to the entity', async () => {
    const inputData = doorEventData.inputData;

    await useCase.execute(doorUserOutDataStunt.id, inputData);

    expect(mockedDoorHistoryValidator.validate).toBeCalledWith(inputData);
  });

  it('calls the entity for reformated data', async () => {
    const inputData = doorEventData.inputData;

    await useCase.execute(doorUserOutDataStunt.id, inputData);

    expect(mockedHistoryEntity.getOutData).toBeCalledWith(inputData);
  });

  it('save the reformated data using the repository', async () => {
    const inputData = doorEventData.inputData;
    const expectedDoorEventData = doorEventData.calculateDoorEventData();

    await useCase.execute(doorUserOutDataStunt.id, inputData);

    expect(mockedAddToHistoryRepository.addEvent).toBeCalledWith(
      doorUserOutDataStunt.id,
      expectedDoorEventData,
    );
  });

  it('returns the expected results', async () => {
    const inputData = doorEventData.inputData;
    const expectedDoorEventOutputData =
      doorEventData.calculateDoorEventOutputData();

    const result = await useCase.execute(doorUserOutDataStunt.id, inputData);
    expect(result).toEqual(expectedDoorEventOutputData);
  });
});
