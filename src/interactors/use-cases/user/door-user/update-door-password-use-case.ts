import { IUpdateDoorUserPasswordRepository } from 'src/contracts/data/repositories/user/door/update-door-user-password-repository.interface';
import { IDoorBelongsToOwnerAuthorizer } from 'src/contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IDoorPasswordConfirmationAuthorizer } from 'src/contracts/interactors/authorizers/password-confirmation-authorizer/door-user-password-confirmation-authorizer.interface';
import { IUpdateDoorUserPasswordUseCase } from 'src/contracts/interactors/use-cases/user/door-user/update-door-user-password-use-case.interface';
import { IPasswordValidator } from 'src/contracts/interactors/validators/user/password-validator.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class UpdateDoorUserPasswordUseCase
  implements IUpdateDoorUserPasswordUseCase
{
  constructor(
    private updatePasswordRepo: IUpdateDoorUserPasswordRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
    private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer,
    private confirmPassword: IDoorPasswordConfirmationAuthorizer,
    private passwordValidator: IPasswordValidator,
  ) {}
  async execute(
    ownerId,
    doorId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<DoorUserOutData> {
    const authorizedAndValidated = await this.authorizeAndValidate(
      ownerId,
      doorId,
      oldPassword,
      newPassword,
    );

    if (authorizedAndValidated) {
      return this.updatePasswordRepo.updatePassword(doorId, newPassword);
    }
  }

  private async authorizeAndValidate(
    ownerId,
    doorId,
    oldPassword,
    newPassword,
  ): Promise<boolean> {
    const isDoorOwner = await this.isDoorOwner.authorize(ownerId);
    const doorBelongsToOwner = await this.doorBelongsToOwner.authorize(
      ownerId,
      doorId,
    );
    const passwordConfirmed = await this.confirmPassword.authorize(
      doorId,
      oldPassword,
    );
    const validPassword = await this.passwordValidator.validate(newPassword);

    return (
      isDoorOwner && doorBelongsToOwner && passwordConfirmed && validPassword
    );
  }
}
