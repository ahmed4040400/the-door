import { IUpdateDoorOwnerPasswordRepository } from 'src/contracts/data/repositories/user/door-owner/update-door-owner-password-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IDoorOwnerPasswordConfirmationAuthorizer } from 'src/contracts/interactors/authorizers/password-confirmation-autorizer/door-owner-user-password-confirmation-authorizer.interface';
import { IUpdateDoorOwnerPasswordUseCase } from 'src/contracts/interactors/use-cases/user/door-owner-user/update-door-owner-password-use-case.interface';
import { IPasswordValidator } from 'src/contracts/interactors/validators/user/password-validator.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class UpdateDoorOwnerPasswordUseCase
  implements IUpdateDoorOwnerPasswordUseCase
{
  constructor(
    private updatePasswordRepo: IUpdateDoorOwnerPasswordRepository,
    private isOwner: IIsDoorOwnerAuthorizer,
    private confirmPassword: IDoorOwnerPasswordConfirmationAuthorizer,
    private passwordValidator: IPasswordValidator,
  ) {}
  async execute(
    ownerUserId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<DoorOwnerUserOutData> {
    const authorizedAndValidated = await this.authorizeAndValidate(
      ownerUserId,
      oldPassword,
      newPassword,
    );
    if (authorizedAndValidated) {
      return this.updatePasswordRepo.updatePassword(ownerUserId, newPassword);
    }
  }

  private async authorizeAndValidate(
    ownerUserId,
    oldPassword,
    newPassword,
  ): Promise<boolean> {
    const isDoorOwner = await this.isOwner.authorize(ownerUserId);

    const passwordConfirmed = await this.confirmPassword.authorize(
      ownerUserId,
      oldPassword,
    );

    const validPassword = await this.passwordValidator.validate(newPassword);

    return isDoorOwner && passwordConfirmed && validPassword;
  }
}
