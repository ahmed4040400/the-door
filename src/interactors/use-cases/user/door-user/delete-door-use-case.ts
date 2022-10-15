import { IDeleteDoorUserRepository } from 'src/contracts/data/repositories/user/door/delete-door-user-repository.interface';
import { IDoorBelongsToOwnerAuthorizer } from 'src/contracts/interactors/authorizers/door-belongs-to-owner-authorizer.interface';
import { IIsDoorOwnerAuthorizer } from 'src/contracts/interactors/authorizers/is-door-owner-authorizer.interface';
import { IDeleteDoorUserUseCase } from 'src/contracts/interactors/use-cases/user/door-user/delete-door-use-case.interface';
import { DoorUserOutData } from 'src/entities/dtos/user/door-user/door-user-output';

export class DeleteDoorUserUseCase implements IDeleteDoorUserUseCase {
  constructor(
    private deleteDoorRepo: IDeleteDoorUserRepository,
    private isDoorOwner: IIsDoorOwnerAuthorizer,
    private doorBelongsToOwner: IDoorBelongsToOwnerAuthorizer,
  ) {}
  async execute(ownerId: string, doorId: string): Promise<DoorUserOutData> {
    const ownerIdIsDoorOwner = await this.isDoorOwner.authorize(ownerId);
    const doorBelongsToOwner = await this.doorBelongsToOwner.authorize(
      ownerId,
      doorId,
    );
    if (ownerIdIsDoorOwner && doorBelongsToOwner) {
      return this.deleteDoorRepo.deleteDoorUser(ownerId, doorId);
    }
  }
}
