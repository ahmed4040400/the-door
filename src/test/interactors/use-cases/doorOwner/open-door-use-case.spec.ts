import {
  doorOwnerUserOutDataStunt,
  doorUserOutDataStunt,
} from '../../../fixtures/user-fixture';
import { IDoorBelongsToOwnerAuthorizer } from '../../../../contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { OpenDoorUseCase } from '../../../../interactors/use-cases/door-owner/open-door-use-case';
import {
  DoorActionData,
  Action,
} from '../../../../entities/dtos/door-action/door-action';
describe('open door use case', () => {
  let mockedDoorBelongsToOwnerAuthorizer: IDoorBelongsToOwnerAuthorizer;
  let openDoorUseCase: OpenDoorUseCase;
  beforeEach(() => {
    mockedDoorBelongsToOwnerAuthorizer = {
      authorize: jest.fn(() => Promise.resolve(true)),
    };
    openDoorUseCase = new OpenDoorUseCase(mockedDoorBelongsToOwnerAuthorizer);
  });

  it('authorize that the door is owned by the owner', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;
    await openDoorUseCase.execute(doorOwnerId, doorId);
    expect(mockedDoorBelongsToOwnerAuthorizer.authorize).toBeCalledWith(
      doorOwnerId,
      doorId,
    );
  });
  it('return a signal to open the door', async () => {
    const doorId = doorUserOutDataStunt.id;
    const doorOwnerId = doorOwnerUserOutDataStunt.id;

    const expectedActionData: DoorActionData = {
      doorId,
      action: Action.open,
    };

    const result = await openDoorUseCase.execute(doorOwnerId, doorId);
    expect(result).toEqual(expectedActionData);
  });
});
