import { DoorEventData } from '../../../../test/fixtures/event-input-data-fixture';
import { doorUserStump } from '../../../../test/fixtures/user-fixture';
import { IDoorUserDataSource } from '../../../../contracts/data/data-sources/door-user-data-source.interface';
import { IHistoryDataSource } from '../../../../contracts/data/data-sources/history-data-source.interface';
import { DeleteFromHistoryRepository } from '../../../../data/repositories-imp/history/delete-from-history-repository.interface';
import { DoorUserOutData } from '../../../../entities/dtos/user/door-user/door-user-output';
import { NotFoundError } from '../../../../base/errors/not-found.error';
import { rejects } from 'assert';

describe('imp of add to history repository', () => {
  let doorEventData: DoorEventData;

  let mockedHistoryDataSource: IHistoryDataSource;
  let mockedUserDataSource: IDoorUserDataSource;
  let repo: DeleteFromHistoryRepository;
  let doorUserData;

  let doorUserDataWithHistory: DoorUserOutData;

  beforeEach(() => {
    doorUserData = structuredClone(doorUserStump);
    doorEventData = new DoorEventData();

    createUserStumpWithHistory();

    mockedHistoryDataSource = {
      addEvent: null,
      deleteEventById: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
      getEventById: null,
    };

    mockedUserDataSource = {
      createDoorUser: jest.fn(() => Promise.resolve(doorUserData)),
      deleteDoorUserById: jest.fn(() => Promise.resolve(doorUserData)),
      updateUserById: jest.fn(() => Promise.resolve(doorUserData)),
      getDoorUserById: jest.fn(() => Promise.resolve(doorUserDataWithHistory)),
    };

    repo = new DeleteFromHistoryRepository(
      mockedHistoryDataSource,
      mockedUserDataSource,
    );
  });

  function createUserStumpWithHistory() {
    doorUserDataWithHistory = structuredClone(doorUserData);

    doorUserDataWithHistory.history.push(
      doorEventData.calculateDoorEventOutputData().id,
    );

    doorUserDataWithHistory.history.push('13');
    doorUserDataWithHistory.history.push('5frhy5');
  }

  it('deletes from the history by calling the historyDataSource deleteEvent', async () => {
    const eventId = doorEventData.calculateDoorEventOutputData().id;
    await repo.deleteEvent(eventId);

    expect(mockedHistoryDataSource.deleteEventById).toBeCalledWith(eventId);
  });

  it('gets the user by the doorUserDataSource getById', async () => {
    const eventData = doorEventData.calculateDoorEventOutputData();

    await repo.deleteEvent(doorEventData.calculateDoorEventOutputData().id);

    expect(mockedUserDataSource.getDoorUserById).toBeCalledWith(
      eventData.doorId,
    );
  });

  it('updates the user to remove the event id from the door user', async () => {
    const expectedDeletedEvent = doorEventData.calculateDoorEventOutputData();
    const expectedUserUpdateObject: DoorUserOutData = structuredClone(
      doorUserDataWithHistory,
    );

    removeEventFromArray(
      expectedDeletedEvent.id,
      expectedUserUpdateObject.history,
    );

    await repo.deleteEvent(expectedDeletedEvent.id);

    expect(mockedUserDataSource.updateUserById).toBeCalledWith(
      doorUserDataWithHistory.id,
      expectedUserUpdateObject,
    );

    function removeEventFromArray(eventId: string, eventsArray: Array<string>) {
      const i = eventsArray.indexOf(eventId);
      if (i === -1) throw new Error('event id is not in the array');
      return eventsArray.splice(i, 1);
    }
  });

  it('deleteEvent returns the deleted event', async () => {
    const eventToDelete = doorEventData.calculateDoorEventOutputData();

    const result = await repo.deleteEvent(doorUserData.id);

    expect(result).toEqual(eventToDelete);
  });

  it('throws an error when the event is not in the doors history', async () => {
    mockedUserDataSource.getDoorUserById = jest.fn(() => doorUserData);
    const expectedDeletedEvent = doorEventData.calculateDoorEventOutputData();

    const shouldThrow = jest.fn(async () => {
      await repo.deleteEvent(expectedDeletedEvent.id);
    });
    expect(await shouldThrow).rejects.toThrowError(NotFoundError);
  });
});
