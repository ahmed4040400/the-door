import { DoorUser } from './door-user';

export interface DoorUserOutData extends DoorUser {
  id: string;
  history: string[];
  ownerId: string;
}
