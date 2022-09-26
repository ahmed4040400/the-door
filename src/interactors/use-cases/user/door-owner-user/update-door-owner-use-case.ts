import { IUpdateDoorOwnerUserRepository } from 'src/contracts/data/repositories/user/door-owner/update-door-owner-user-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IUpdateDoorOwnerUserUseCase } from 'src/contracts/interactors/use-cases/user/door-owner-user/update-door-owner-use-case.interface';
import { IDoorOwnerUserPartialValidator } from 'src/contracts/interactors/validators/user/door-owner/door-owner-user-partial-validator.interface';
import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class UpdateDoorOwnerUserUseCase implements IUpdateDoorOwnerUserUseCase {
  constructor(
    private updateOwnerRepository: IUpdateDoorOwnerUserRepository,
    private IsDoorOwner: IIsDoorOwnerAuthorizer,
    private ownerPartialValidator: IDoorOwnerUserPartialValidator,
  ) {}

  async execute(
    ownerUserId: string,
    doorOwnerUserUpdateData: Partial<DoorOwnerUser>,
  ): Promise<DoorOwnerUserOutData> {
    const isAuthorizedAndValidated = await this.authorizeAndValidate(
      ownerUserId,
      doorOwnerUserUpdateData,
    );

    if (isAuthorizedAndValidated)
      return this.updateOwnerRepository.updateUser(
        ownerUserId,
        doorOwnerUserUpdateData,
      );
  }

  private async authorizeAndValidate(
    ownerId: string,
    updateData: Partial<DoorOwnerUser>,
  ) {
    const isAuthorized = await this.IsDoorOwner.authorize(ownerId);

    if (isAuthorized) {
      return this.ownerPartialValidator.validate(updateData);
    }
  }
}
