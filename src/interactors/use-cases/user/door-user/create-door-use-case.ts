import { ICreateDoorUserRepository } from 'src/contracts/data/repositories/user/door/create-door-user-repository.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { ICreateDoorUserUseCase } from 'src/contracts/interactors/use-cases/user/door-user/create-door-use-case.interface';
import { IDoorUserValidator } from 'src/contracts/interactors/validators/user/door/door-user-validator.interface';
import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class CreateDoorUserUseCase implements ICreateDoorUserUseCase {
  constructor(
    private createRepo: ICreateDoorUserRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
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
    const isAuthorized = await this.isDoorOwner.authorize(ownerId);

    if (isAuthorized) {
      return this.doorValidator.validate(doorUserData);
    }
  }
}
