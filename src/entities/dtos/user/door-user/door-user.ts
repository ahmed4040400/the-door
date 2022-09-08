export interface DoorUser {
  email: string;
  password: string;
  history: string[]; // list of events id strings
}
