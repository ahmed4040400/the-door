import { UseCase } from 'src/base/use-case.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface IGetDoorUserUseCase extends UseCase {
  execute(doorId: string): Promise<DoorUserOutData>;
}
