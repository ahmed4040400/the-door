import { DoorOwnerUser } from './door-owner-user';

export interface DoorOwnerUserOutData extends DoorOwnerUser {
  id: string;
  doors: string[];
}
