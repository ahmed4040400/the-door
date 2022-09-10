import { IGetFromHistoryByEventIdRepository } from 'src/contracts/data/repositories/history/get-from-history-by-event-id-repository.interface';
import { IGetDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/doorOwner/get-door-owner-user-repository.interface';
import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorHistoryAuthorizer } from '../../../interactors/authorizer/door-history-authorizor';
import { DoorEventData } from '../../../test/fixtures/event-input-data-fixture';
import { doorOwnerUserStunt } from '../../fixtures/user-fixture';

describe('door history authorizer', () => {
  let mockedGetDoorOwnerUserRepository: IGetDoorOwnerUserRepository;
  let mockedGetFromHistoryByEventIdRepository: IGetFromHistoryByEventIdRepository;
  let doorHistoryAuthorizer: DoorHistoryAuthorizer;
  let doorEventData: DoorEventData;
  beforeEach(() => {
    doorEventData = new DoorEventData();
    mockedGetDoorOwnerUserRepository = {
      getUser: jest.fn(() => Promise.resolve(doorOwnerUserStunt)),
    };
    mockedGetFromHistoryByEventIdRepository = {
      getEvent: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
    };
    doorHistoryAuthorizer = new DoorHistoryAuthorizer(
      mockedGetDoorOwnerUserRepository,
      mockedGetFromHistoryByEventIdRepository,
    );
  });

  it('gets the door owner user from the door owner repository', () => {
    const userId = doorOwnerUserStunt.id;
    const eventId = doorEventData.calculateDoorEventOutputData().id;
    doorHistoryAuthorizer.authorize(userId, eventId);

    expect(mockedGetDoorOwnerUserRepository.getUser).toBeCalledWith(userId);
  });

  it('gets the event from the get event repository', async () => {
    const userId = doorOwnerUserStunt.id;
    const eventId = doorEventData.calculateDoorEventOutputData().id;

    await doorHistoryAuthorizer.authorize(userId, eventId);

    expect(mockedGetFromHistoryByEventIdRepository.getEvent).toBeCalledWith(
      eventId,
    );
  });

  it('returns false if the door owner does not own the door related to the history', async () => {
    const userId = doorOwnerUserStunt.id;
    const eventId = doorEventData.calculateDoorEventOutputData().id;

    const result = await doorHistoryAuthorizer.authorize(userId, eventId);

    expect(result).toEqual(false);
  });

  it('returns true if the door owner own the door related to the history', async () => {
    const doorOwnerToReturn: DoorOwnerUser =
      structuredClone(doorOwnerUserStunt);
    const userId = doorOwnerToReturn.id;

    const event = doorEventData.calculateDoorEventOutputData();

    doorOwnerToReturn.doors.push(event.doorId);
    doorOwnerToReturn.doors.push('another random id');
    setStuntsForValidAuthorization(doorOwnerToReturn);
    const result = await doorHistoryAuthorizer.authorize(userId, event.id);

    expect(result).toEqual(true);
  });

  function setStuntsForValidAuthorization(doorOwnerToReturn: DoorOwnerUser) {
    mockedGetDoorOwnerUserRepository = {
      getUser: jest.fn(() => {
        return Promise.resolve(doorOwnerToReturn);
      }),
    };
    reInitializeAuthorizer();
  }

  function reInitializeAuthorizer() {
    doorHistoryAuthorizer = new DoorHistoryAuthorizer(
      mockedGetDoorOwnerUserRepository,
      mockedGetFromHistoryByEventIdRepository,
    );
  }
});
