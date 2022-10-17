import { IHistoryDataSource } from '../../../../contracts/data/data-sources/history-data-source.interface';
import { GetFromHistoryByEventIdRepository } from '../../../../data/repositories-imp/history/get-from-history-repository.repository';
import { DoorEventDataStunt } from '../../../fixtures/event-input-data-fixture';

describe('get the an event from history repository', () => {
  let mockedHistoryDataSource: IHistoryDataSource;
  let getFromHistoryRepository: GetFromHistoryByEventIdRepository;

  const doorEventDataStunt =
    new DoorEventDataStunt().calculateDoorEventOutputData();
  beforeEach(() => {
    mockedHistoryDataSource = {
      getEventById: jest.fn(() => Promise.resolve(doorEventDataStunt)),
      addEvent: null,
      deleteEventById: null,
    };
    getFromHistoryRepository = new GetFromHistoryByEventIdRepository(
      mockedHistoryDataSource,
    );
  });
  it('retrieve the event by the data source', async () => {
    const eventId = doorEventDataStunt.id;
    await getFromHistoryRepository.getEvent(eventId);
    expect(mockedHistoryDataSource.getEventById).toBeCalledWith(eventId);
  });

  it('return the retrieved event from the data source', async () => {
    const eventId = doorEventDataStunt.id;
    const expectedResult = doorEventDataStunt;
    const result = await getFromHistoryRepository.getEvent(eventId);
    expect(result).toEqual(expectedResult);
  });
});
