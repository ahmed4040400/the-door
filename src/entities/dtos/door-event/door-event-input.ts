export enum Event {
  open = 'open',
  close = 'close',
  move = 'move',
}

export interface DoorEventInData {
  doorId: string;
  event: Event;
  angleFrom: number;
  angleTo: number;
}
