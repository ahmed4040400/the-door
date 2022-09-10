export interface DoorUser {
  userName: string;
  password: string;
  history: string[]; // list of events id strings
}
