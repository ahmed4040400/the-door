import { IUpdateDoorOwnerUsernameRepository } from 'src/contracts/data/repositories/user/door-owner/update-door-owner-username-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IUpdateDoorOwnerUsernameUseCase } from 'src/contracts/interactors/use-cases/user/door-owner-user/update-door-owner-username-use-case.interface';
import { IEmailValidator } from 'src/contracts/interactors/validators/user/email-validator.interface';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class UpdateDoorOwnerUsernameUseCase
  implements IUpdateDoorOwnerUsernameUseCase
{
  constructor(
    private updateOwnerUsernameRepository: IUpdateDoorOwnerUsernameRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
    private ownerUsernameValidator: IEmailValidator,
  ) {}

  async execute(
    ownerUserId: string,
    newUsername: string,
  ): Promise<DoorOwnerUserOutData> {
    const isAuthorizedAndValidated = await this.authorizeAndValidate(
      ownerUserId,
      newUsername,
    );

    if (isAuthorizedAndValidated)
      return this.updateOwnerUsernameRepository.updateUsername(
        ownerUserId,
        newUsername,
      );
  }

  private async authorizeAndValidate(ownerId: string, updateData: string) {
    const isAuthorized = await this.isDoorOwner.authorize(ownerId);

    if (isAuthorized) {
      return this.ownerUsernameValidator.validate(updateData);
    }
  }
}
