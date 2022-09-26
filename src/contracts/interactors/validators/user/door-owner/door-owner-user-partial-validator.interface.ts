import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';

export interface IDoorOwnerUserPartialValidator {
  validate(doorOwnerUser: Partial<DoorOwnerUser>): Promise<boolean>;
}
