import { UseCase } from 'src/base/use-case.interface';
import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export interface ICreateDoorUserUseCase extends UseCase {
  execute(ownerId: string, doorUserData: DoorUser): Promise<DoorUserOutData>;
}
