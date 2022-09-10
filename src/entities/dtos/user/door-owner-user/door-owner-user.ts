export interface DoorOwnerUser {
  id: string;
  email: string;
  password: string;
  doors: string[];
  history: string[]; // list of events id strings
}
