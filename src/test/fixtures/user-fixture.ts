import { DoorOwnerUser } from 'src/entities/dtos/user/door-owner-user/door-owner-user';
import { DoorUserOutData } from '../../entities/dtos/user/door-user/door-user-output';

export const doorUserStunt: DoorUserOutData = {
  id: '21',
  userName: 'ahmedTest3355',
  password: 'test32542r',
  history: [],
};

export const doorOwnerUserStunt: DoorOwnerUser = {
  id: '21',
  email: 'helloWorld@email.com',
  password: 'test32542r',
  history: [],
  doors: [],
};
