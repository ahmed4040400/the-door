export enum Action {
  open = 'open',
  close = 'close',
  move = 'move',
  stop = 'stop',
}

export interface DoorActionData {
  doorId: string;
  action: Action;
  angleTo?: number;
}
