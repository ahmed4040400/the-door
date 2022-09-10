import { DoorEventData } from '../../../../test/fixtures/event-input-data-fixture';
import { doorUserStunt } from '../../../../test/fixtures/user-fixture';
import { IDoorUserDataSource } from '../../../../contracts/data/data-sources/door-user-data-source.interface';
import { IHistoryDataSource } from '../../../../contracts/data/data-sources/history-data-source.interface';
import { AddToHistoryRepository } from '../../../../data/repositories-imp/history/add-to-history-repository.interface';
import { DoorEvent } from 'src/entities/dtos/door-event/door-event';

describe('imp of add to history repository', () => {
  let doorEventData: DoorEventData;

  let mockedHistoryDataSource: IHistoryDataSource;
  let mockedUserDataSource: IDoorUserDataSource;
  let repo: AddToHistoryRepository;
  let doorUserData;

  beforeEach(() => {
    doorUserData = structuredClone(doorUserStunt);
    doorEventData = new DoorEventData();
    mockedHistoryDataSource = {
      addEvent: jest.fn((doorEvent: DoorEvent) => {
        return Promise.resolve({
          ...doorEvent,
          id: doorEventData.calculateDoorEventOutputData().id,
        });
      }),
      deleteEventById: null,
      getEventById: null,
    };

    mockedUserDataSource = {
      createDoorUser: jest.fn(() => Promise.resolve(doorUserData)),
      deleteDoorUserById: jest.fn(() => Promise.resolve(doorUserData)),
      updateUserById: jest.fn(() => Promise.resolve(doorUserData)),
      getDoorUserById: jest.fn(() => Promise.resolve(doorUserData)),
    };

    repo = new AddToHistoryRepository(
      mockedHistoryDataSource,
      mockedUserDataSource,
    );
  });

  it('adds to the history by calling the historyDataSource addEvent', async () => {
    await repo.addEvent(
      doorUserData.id,
      doorEventData.calculateDoorEventData(),
    );

    expect(mockedHistoryDataSource.addEvent).toBeCalledWith(
      doorEventData.calculateDoorEventData(),
    );
  });

  it('gets the user by the doorUserDataSource getById', async () => {
    await repo.addEvent(
      doorUserData.id,
      doorEventData.calculateDoorEventData(),
    );

    expect(mockedUserDataSource.getDoorUserById).toBeCalledWith(
      doorUserData.id,
    );
  });

  it('updates the user to add the event id to the door user', async () => {
    const expectedCreatedEvent = doorEventData.calculateDoorEventOutputData();
    const expectedUserUpdateObject = structuredClone(doorUserData);
    expectedUserUpdateObject.history.push(expectedCreatedEvent.id);

    await repo.addEvent(
      doorUserData.id,
      doorEventData.calculateDoorEventData(),
    );

    expect(mockedUserDataSource.updateUserById).toBeCalledWith(
      doorUserData.id,
      expectedUserUpdateObject,
    );
  });

  it('addEvent returns the created event', async () => {
    const eventToCreate = doorEventData.calculateDoorEventData();
    const expectedCreatedEvent = doorEventData.calculateDoorEventOutputData();

    const result = await repo.addEvent(doorUserData.id, eventToCreate);

    expect(result).toEqual(expectedCreatedEvent);
  });
});
