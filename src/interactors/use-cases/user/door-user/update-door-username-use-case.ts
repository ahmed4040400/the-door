import { IUpdateDoorUsernameRepository } from 'src/contracts/data/repositories/user/door/update-door-user-repository.interface';
import { IDoorBelongsToOwnerAuthorizer } from 'src/contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IUpdateDoorUsernameUseCase } from 'src/contracts/interactors/use-cases/user/door-user/update-door-use-case.interface';
import { IDoorUsernameValidator } from 'src/contracts/interactors/validators/user/door/door-user-partial-validator.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class UpdateDoorUsernameUseCase implements IUpdateDoorUsernameUseCase {
  constructor(
    private updateRepo: IUpdateDoorUsernameRepository,
    private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer,
    private doorUsernameValidator: IDoorUsernameValidator,
  ) {}

  async execute(
    ownerId: string,
    doorId: string,
    newUsername: string,
  ): Promise<DoorUserOutData> {
    const isAuthorizedAndValidated = await this.authorizeAndValidate(
      ownerId,
      doorId,
      newUsername,
    );

    if (isAuthorizedAndValidated) {
      return this.updateRepo.createUser(doorId, newUsername);
    }
  }

  private async authorizeAndValidate(
    ownerId: string,
    doorId: string,
    newUsername: string,
  ) {
    const isAuthorized = await this.doorBelongsToOwner.authorize(
      ownerId,
      doorId,
    );

    if (isAuthorized) {
      return this.doorUsernameValidator.validate(newUsername);
    }
  }
}
