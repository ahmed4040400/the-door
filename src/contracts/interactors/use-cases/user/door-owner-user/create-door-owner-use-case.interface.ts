import { UseCase } from 'src/base/use-case.interface';
import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface ICreateDoorOwnerUserUseCase extends UseCase {
  execute(doorOwnerUserData: DoorOwnerUser): Promise<DoorOwnerUserOutData>;
}
