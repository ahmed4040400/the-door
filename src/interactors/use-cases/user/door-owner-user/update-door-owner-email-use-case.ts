import { IUpdateDoorOwnerEmailRepository } from 'src/contracts/data/repositories/user/door-owner/update-door-owner-email-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IOwnersEmailIsUniqueAuthorizer } from 'src/contracts/interactors/authorizers/owners-email-is-unique-authorizer.interface';
import { IUpdateDoorOwnerUsernameUseCase } from 'src/contracts/interactors/use-cases/user/door-owner-user/update-door-owner-username-use-case.interface';
import { IEmailValidator } from 'src/contracts/interactors/validators/user/email-validator.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class UpdateDoorOwnerEmailUseCase
  implements IUpdateDoorOwnerUsernameUseCase
{
  constructor(
    private updateOwnerUsernameRepository: IUpdateDoorOwnerEmailRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
    private emailIsUnique: IOwnersEmailIsUniqueAuthorizer,
    private ownerEmailValidator: IEmailValidator,
  ) {}

  async execute(
    ownerUserId: string,
    newEmail: string,
  ): Promise<DoorOwnerUserOutData> {
    const isAuthorizedAndValidated = await this.authorizeAndValidate(
      ownerUserId,
      newEmail,
    );

    if (isAuthorizedAndValidated)
      return this.updateOwnerUsernameRepository.updateUsername(
        ownerUserId,
        newEmail,
      );
  }

  private async authorizeAndValidate(ownerId: string, newEmail: string) {
    const isDoorOwner = await this.isDoorOwner.authorize(ownerId);
    const isUniqueEmail = await this.emailIsUnique.authorize(newEmail);
    if (isDoorOwner && isUniqueEmail) {
      return this.ownerEmailValidator.validate(newEmail);
    }
  }
}
