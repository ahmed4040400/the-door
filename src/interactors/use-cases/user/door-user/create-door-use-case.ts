import { ICreateDoorUserRepository } from 'src/contracts/data/repositories/user/door/create-door-user-repository.interface';
import { IDoorUsernameIsUniqueAuthorizer } from 'src/contracts/interactors/authorizers/door-username-is-unique-authorizer.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { ICreateDoorUserUseCase } from 'src/contracts/interactors/use-cases/user/door-user/create-door-use-case.interface';
import { IDoorUserValidator } from 'src/contracts/interactors/validators/user/door/door-user-validator.interface';
import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class CreateDoorUserUseCase implements ICreateDoorUserUseCase {
  constructor(
    private createRepo: ICreateDoorUserRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
    private usernameIsUnique: IDoorUsernameIsUniqueAuthorizer,
    private doorValidator: IDoorUserValidator,
  ) {}

  async execute(
    ownerId: string,
    doorUserData: DoorUser,
  ): Promise<DoorUserOutData> {
    const isAuthorizedAndValidated = await this.authorizeAndValidate(
      ownerId,
      doorUserData,
    );
    if (isAuthorizedAndValidated) {
      return this.createRepo.createUser(ownerId, doorUserData);
    }
  }

  private async authorizeAndValidate(ownerId: string, doorUserData: DoorUser) {
    const isDoorOwner = await this.isDoorOwner.authorize(ownerId);
    const isUniqueUsername = await this.usernameIsUnique.authorize(
      doorUserData.username,
    );
    if (isDoorOwner && isUniqueUsername) {
      return this.doorValidator.validate(doorUserData);
    }
  }
}
