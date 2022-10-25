import { IUpdateDoorUsernameRepository } from 'src/contracts/data/repositories/user/door/update-door-user-username-repository.interface';
import { IDoorBelongsToOwnerAuthorizer } from 'src/contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IDoorUsernameIsUniqueAuthorizer } from 'src/contracts/interactors/authorizers/door-username-is-unique-authorizer.interface';
import { IUpdateDoorUsernameUseCase } from 'src/contracts/interactors/use-cases/user/door-user/update-door-use-case.interface';
import { IDoorUsernameValidator } from 'src/contracts/interactors/validators/user/door/door-username-validator.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class UpdateDoorUsernameUseCase implements IUpdateDoorUsernameUseCase {
  constructor(
    private updateRepo: IUpdateDoorUsernameRepository,
    private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer,
    private DoorUsernameIsUnique: IDoorUsernameIsUniqueAuthorizer,
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
      return this.updateRepo.updateUsername(doorId, newUsername);
    }
  }

  private async authorizeAndValidate(
    ownerId: string,
    doorId: string,
    newUsername: string,
  ) {
    const doorBelongsToOwner = await this.doorBelongsToOwner.authorize(
      ownerId,
      doorId,
    );
    const userNameIsUnique = await this.DoorUsernameIsUnique.authorize(
      newUsername,
    );

    if (doorBelongsToOwner && userNameIsUnique) {
      return this.doorUsernameValidator.validate(newUsername);
    }
  }
}
