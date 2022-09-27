import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorOwnerUserOutData } from 'src/entities/dtos/user/door-owner-user/door-owner-user-output-data';
import { DoorUser } from 'src/entities/dtos/user/door-user/door-user';
import { DoorUserOutData } from '../../entities/dtos/user/door-user/door-user-output';

export const doorUserOutDataStunt: DoorUserOutData = {
  id: '21',
  userName: 'ahmedTest3355',
  password: 'test32542r',
  history: [],
  ownerIds: [],
};

export const doorUserStunt: DoorUser = {
  userName: 'ahmedTest3355',
  password: 'test32542r',
};

export const doorOwnerUserOutDataStunt: DoorOwnerUserOutData = {
  id: '17',
  email: 'helloWorld@email.com',
  password: 'test32542r',
  doors: [],
};

export const doorOwnerUserStunt: DoorOwnerUser = {
  email: 'helloWorld@email.com',
  password: 'test32542r',
};
