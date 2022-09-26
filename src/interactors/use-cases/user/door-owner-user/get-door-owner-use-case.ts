import { IGetDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/get-door-owner-user-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IGetDoorOwnerUserUseCase } from 'src/contracts/interactors/use-cases/user/door-owner-user/get-door-owner-use-case.interface';
import { DoorOwnerUserOutData } from '../../../../entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class GetDoorOwnerUserUseCase implements IGetDoorOwnerUserUseCase {
  constructor(
    private getOwnerRepo: IGetDoorOwnerUserRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
  ) {}
  async execute(ownerUserId: string): Promise<DoorOwnerUserOutData> {
    const isAuthorized = await this.isDoorOwner.authorize(ownerUserId);
    if (isAuthorized) {
      return this.getOwnerRepo.getUser(ownerUserId);
    }
  }
}
