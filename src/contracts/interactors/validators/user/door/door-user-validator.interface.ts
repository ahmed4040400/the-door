import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';

export interface IDoorUserValidator {
  validate(doorUserData: DoorUser): Promise<boolean>;
}
