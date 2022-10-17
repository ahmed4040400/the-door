import { NotAuthorizedError } from '../../../base/errors/not-authorized.error';
import { IGetFromHistoryByEventIdRepository } from 'src/contracts/data/repositories/history/get-from-history-by-event-id-repository.interface';
import { IGetDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/get-door-owner-user-repository.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';
import { DoorBelongsToOwnerAuthorizer } from '../../../interactors/authorizer/door-belongs-to-user-authorizer';
import { DoorEventDataStunt } from '../../../test/fixtures/event-input-data-fixture';
import { doorOwnerUserOutDataStunt } from '../../fixtures/user-fixture';

describe('door history authorizer', () => {
  let mockedGetDoorOwnerUserRepository: IGetDoorOwnerUserRepository;
  let mockedGetFromHistoryByEventIdRepository: IGetFromHistoryByEventIdRepository;
  let doorHistoryAuthorizer: DoorBelongsToOwnerAuthorizer;
  let doorEventData: DoorEventDataStunt;

  beforeEach(() => {
    doorEventData = new DoorEventDataStunt();

    mockedGetFromHistoryByEventIdRepository = {
      getEvent: jest.fn(() =>
        Promise.resolve(doorEventData.calculateDoorEventOutputData()),
      ),
    };

    setAuthorizedDoorOwnerStunt();

    doorHistoryAuthorizer = new DoorBelongsToOwnerAuthorizer(
      mockedGetDoorOwnerUserRepository,
      mockedGetFromHistoryByEventIdRepository,
    );
  });

  it('gets the door owner user from the door owner repository', () => {
    const userId = doorOwnerUserOutDataStunt.id;
    const eventId = doorEventData.calculateDoorEventOutputData().id;
    doorHistoryAuthorizer.authorize(userId, eventId);

    expect(mockedGetDoorOwnerUserRepository.getUser).toBeCalledWith(userId);
  });

  it('gets the event from the get event repository', async () => {
    const userId = doorOwnerUserOutDataStunt.id;
    const eventId = doorEventData.calculateDoorEventOutputData().id;

    await doorHistoryAuthorizer.authorize(userId, eventId);

    expect(mockedGetFromHistoryByEventIdRepository.getEvent).toBeCalledWith(
      eventId,
    );
  });

  it('throws when the door owner user is not authorized', async () => {
    setNotAuthorizedDoorOwnerStunt();
    const userId = doorOwnerUserOutDataStunt.id;
    const eventId = doorEventData.calculateDoorEventOutputData().id;

    const shouldThrow = async () => {
      await doorHistoryAuthorizer.authorize(userId, eventId);
    };

    expect(await shouldThrow).rejects.toThrowError(NotAuthorizedError);
  });

  it('returns true if the door owner own the door related to the history', async () => {
    const userId = doorOwnerUserOutDataStunt.id;

    const event = doorEventData.calculateDoorEventOutputData();

    const result = await doorHistoryAuthorizer.authorize(userId, event.id);

    expect(result).toEqual(true);
  });

  function setAuthorizedDoorOwnerStunt() {
    const doorOwnerToReturn: DoorOwnerUserOutData = structuredClone(
      doorOwnerUserOutDataStunt,
    );

    const event = doorEventData.calculateDoorEventOutputData();

    doorOwnerToReturn.doors.push(event.doorId);
    doorOwnerToReturn.doors.push('another random id');

    mockedGetDoorOwnerUserRepository = {
      getUser: jest.fn(() => {
        return Promise.resolve(doorOwnerToReturn);
      }),
    };
    reInitializeAuthorizer();
  }

  function setNotAuthorizedDoorOwnerStunt() {
    mockedGetDoorOwnerUserRepository = {
      getUser: jest.fn(() => Promise.resolve(doorOwnerUserOutDataStunt)),
    };

    reInitializeAuthorizer();
  }

  function reInitializeAuthorizer() {
    doorHistoryAuthorizer = new DoorBelongsToOwnerAuthorizer(
      mockedGetDoorOwnerUserRepository,
      mockedGetFromHistoryByEventIdRepository,
    );
  }
});
