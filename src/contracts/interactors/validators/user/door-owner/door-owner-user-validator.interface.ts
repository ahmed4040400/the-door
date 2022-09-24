import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';

export interface IDoorOwnerUserValidator {
  validate(doorOwnerUser: DoorOwnerUser): Promise<boolean>;
}
