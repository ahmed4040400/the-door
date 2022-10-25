import { IOwnersEmailIsUniqueAuthorizer } from 'src/contracts/interactors/authorizers/owners-email-is-unique-authorizer.interface';
import { IDoorOwnerUserValidator } from 'src/contracts/interactors/validators/user/door-owner/door-owner-user-validator.interface';
import { ICreateDoorOwnerUserRepository } from '../../../../contracts/data/repositories/user/door-owner/create-door-owner-user-repository.interface';
import { ICreateDoorOwnerUserUseCase } from '../../../../contracts/interactors/use-cases/user/door-owner-user/create-door-owner-use-case.interface';
import { DoorOwnerUser } from '../../../../entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from '../../../../entities/dtos/user/door-owner-user/door-owner-user-output-data';

export class CreateDoorOwnerUserUseCase implements ICreateDoorOwnerUserUseCase {
  constructor(
    private createOwnerRepo: ICreateDoorOwnerUserRepository,
    private emailIsUnique: IOwnersEmailIsUniqueAuthorizer,
    private validator: IDoorOwnerUserValidator,
  ) {}

  async execute(
    doorOwnerUserData: DoorOwnerUser,
  ): Promise<DoorOwnerUserOutData> {
    const authorizedAndValidated = await this.authorizeAndValidate(
      doorOwnerUserData,
    );
    if (authorizedAndValidated) {
      return this.createOwnerRepo.createUser(doorOwnerUserData);
    }
  }

  private async authorizeAndValidate(doorOwnerUserData: DoorOwnerUser) {
    const isUniqueEmail = await this.emailIsUnique.authorize(
      doorOwnerUserData.email,
    );
    if (isUniqueEmail) {
      return this.validator.validate(doorOwnerUserData);
    }
  }
}
