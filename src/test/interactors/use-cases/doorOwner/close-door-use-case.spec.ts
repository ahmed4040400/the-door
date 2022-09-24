import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
} from '../../../fixtures/user-fixture';
import { IDoorBelongsToOwnerAuthorizer } from '../../../../contracts/interactors/authorizers/door-belongs-to-user-authorizer.interface';
import { CloseDoorUseCase } from '../../../../interactors/use-cases/door-owner/close-door-use-case';
import {
  DoorActionData,
  Action,
} from '../../../../entities/dtos/door-action/door-action';

describe('open door use case', () => {
  let mockedDoorBelongsToOwnerAuthorizer: IDoorBelongsToOwnerAuthorizer;
  let closeDoorUseCase: CloseDoorUseCase;
  beforeEach(() => {
    mockedDoorBelongsToOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    closeDoorUseCase = new CloseDoorUseCase(mockedDoorBelongsToOwnerAuthorizer);
  });

  it('authorize that the door is owned by the owner', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;
    await closeDoorUseCase.execute(doorOwnerId, doorId);
    expect(mockedDoorBelongsToOwnerAuthorizer.authorize).toBeCalledWith(
      doorOwnerId,
      doorId,
    );
  });
  it('return a signal to close the door', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;

    const expectedActionData: DoorActionData = {
      doorId,
      action: Action.close,
    };

    const result = await closeDoorUseCase.execute(doorOwnerId, doorId);
    expect(result).toEqual(expectedActionData);
  });
});
