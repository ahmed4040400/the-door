import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
} from '../../../fixtures/user-fixture';
import { IDoorBelongsToOwnerAuthorizer } from '../../../../contracts/interactors/authorizers/door-belongs-to-user-authorizer.interface';
import { StopMovingDoorUseCase } from '../../../../interactors/use-cases/door-owner/stop-moving-door-use-case';
import {
  DoorActionData,
  Action,
} from '../../../../entities/dtos/door-action/door-action';

describe('open door use case', () => {
  let mockedDoorBelongsToOwnerAuthorizer: IDoorBelongsToOwnerAuthorizer;
  let stopMovingDoorUseCase: StopMovingDoorUseCase;
  beforeEach(() => {
    mockedDoorBelongsToOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    stopMovingDoorUseCase = new StopMovingDoorUseCase(
      mockedDoorBelongsToOwnerAuthorizer,
    );
  });

  it('authorize that the door is owned by the owner', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;
    await stopMovingDoorUseCase.execute(doorOwnerId, doorId);
    expect(mockedDoorBelongsToOwnerAuthorizer.authorize).toBeCalledWith(
      doorOwnerId,
      doorId,
    );
  });

  it('return a signal to stop the door while moving', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;

    const expectedActionData: DoorActionData = {
      doorId,
      action: Action.stop,
    };

    const result = await stopMovingDoorUseCase.execute(doorOwnerId, doorId);
    expect(result).toEqual(expectedActionData);
  });
});
