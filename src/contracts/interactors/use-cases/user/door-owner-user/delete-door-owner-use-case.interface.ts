import { UseCase } from 'src/base/use-case.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export interface IDeleteDoorOwnerUserUseCase extends UseCase {
  execute(ownerUserId: string): Promise<DoorOwnerUserOutData>;
}
