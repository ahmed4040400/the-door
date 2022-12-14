import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';
import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from '../../entities/dtos/user/door-user/door-user-output';

export const doorUserOutDataStunt: DoorUserOutData = {
  id: '21',
  username: 'ahmedTest3355',
  password: 'password',
  history: [],
  ownerId: '4',
};

export const doorUserStunt: DoorUser = {
  username: 'ahmedTest3355',
  password: 'test32542r',
  history: [],
  ownerId: '4',
};

export const doorOwnerUserOutDataStunt: DoorOwnerUserOutData = {
  id: '17',
  email: 'helloWorld@email.com',
  password: 'password',
  doors: [],
};

export const doorOwnerUserStunt: DoorOwnerUser = {
  email: 'helloWorld@email.com',
  password: 'test32542r',
  doors: [],
};
