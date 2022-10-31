import { doorUserOutDataStunt } from '../../../../fixtures/user-fixture';
import { IGetDoorUserRepository } from '../../../../../contracts/data/repositories/user/door/get-door-user-repositroy.interface';
import { GetDoorUserUseCase } from '../../../../../interactors/use-cases/user/door-user/get-door-use-case';

describe('get door use cases', () => {
  let mockedGetDoorRepository: IGetDoorUserRepository;
  let getDoorUserUseCase: GetDoorUserUseCase;

  const doorId = doorUserOutDataStunt.id;
  beforeEach(() => {
    mockedGetDoorRepository = {
      getUser: jest.fn(() => Promise.resolve(doorUserOutDataStunt)),
    };

    getDoorUserUseCase = new GetDoorUserUseCase(mockedGetDoorRepository);
  });

  it('calls the repo to get te door user', async () => {
    await getDoorUserUseCase.execute(doorId);
    expect(mockedGetDoorRepository.getUser).toBeCalledWith(doorId);
  });

  it('return the retrieved door user', async () => {
    const expectedResult = await mockedGetDoorRepository.getUser(doorId);
    const result = await getDoorUserUseCase.execute(doorId);

    expect(result).toEqual(expectedResult);
  });
});
