import { IGetDoorUserRepository } from 'src/contracts/data/repositories/user/door/get-door-user-repositroy.interface';
import { IGetDoorUserUseCase } from 'src/contracts/interactors/use-cases/user/door-user/get-door-use-case.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class GetDoorUserUseCase implements IGetDoorUserUseCase {
  constructor(private getDoorRepo: IGetDoorUserRepository) {}
  async execute(doorId: string): Promise<DoorUserOutData> {
    return this.getDoorRepo.getUser(doorId);
  }
}
