import { IDeleteDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/delete-door-owner-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IDeleteDoorOwnerUserUseCase } from 'src/contracts/interactors/use-cases/user/door-owner-user/delete-door-owner-use-case.interface';
import { DoorOwnerUserOutData } from '../../../../entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class DeleteDoorOwnerUserUseCase implements IDeleteDoorOwnerUserUseCase {
  constructor(
    private deleteOwnerRepo: IDeleteDoorOwnerUserRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
  ) {}
  async execute(ownerUserId: string): Promise<DoorOwnerUserOutData> {
    const isAuthorized = await this.isDoorOwner.authorize(ownerUserId);
    if (isAuthorized) {
      return this.deleteOwnerRepo.deleteUser(ownerUserId);
    }
  }
}
