import { IUpdateDoorOwnerPasswordRepository } from 'src/contracts/data/repositories/user/door-owner/update-door-owner-password-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { ISamePasswordAuthorizer } from 'src/contracts/interactors/authorizers/same-password-authorizer.interface';
import { IUpdateDoorOwnerPasswordUseCase } from 'src/contracts/interactors/use-cases/user/door-owner-user/update-door-owner-password-use-case.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class UpdateDoorOwnerPasswordUseCase
  implements IUpdateDoorOwnerPasswordUseCase
{
  constructor(
    private samePassword: ISamePasswordAuthorizer,
    private isOwner: IIsDoorOwnerAuthorizer,
    private updatePasswordRepo: IUpdateDoorOwnerPasswordRepository,
  ) {}
  async execute(
    ownerUserId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<DoorOwnerUserOutData> {
    const passwordConfirmed = await this.samePassword.authorize(
      oldPassword,
      newPassword,
    );
    const isDoorOwner = await this.isOwner.authorize(ownerUserId);
    if (passwordConfirmed && isDoorOwner) {
      return this.updatePasswordRepo.updatePassword(ownerUserId, newPassword);
    }
  }
}
