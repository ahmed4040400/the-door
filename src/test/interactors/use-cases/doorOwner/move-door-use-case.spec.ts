import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
} from '../../../fixtures/user-fixture';
import { IDoorBelongsToOwnerAuthorizer } from '../../../../contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { MoveDoorUseCase } from '../../../../interactors/use-cases/door-owner/move-door-use-case';
import {
  DoorActionData,
  Action,
} from '../../../../entities/dtos/door-action/door-action';

describe('open door use case', () => {
  let mockedDoorBelongsToOwnerAuthorizer: IDoorBelongsToOwnerAuthorizer;
  let moveDoorUseCase: MoveDoorUseCase;
  beforeEach(() => {
    mockedDoorBelongsToOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    moveDoorUseCase = new MoveDoorUseCase(mockedDoorBelongsToOwnerAuthorizer);
  });

  it('authorize that the door is owned by the owner', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;
    const angleToMoveTo = 120;
    await moveDoorUseCase.execute(doorOwnerId, doorId, angleToMoveTo);
    expect(mockedDoorBelongsToOwnerAuthorizer.authorize).toBeCalledWith(
      doorOwnerId,
      doorId,
    );
  });

  it('return a signal to move the door', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;
    const angleToMoveTo = 120;

    const expectedActionData: DoorActionData = {
      doorId,
      action: Action.move,
      angleTo: angleToMoveTo,
    };

    const result = await moveDoorUseCase.execute(
      doorOwnerId,
      doorId,
      angleToMoveTo,
    );

    expect(result).toEqual(expectedActionData);
  });
});
