export enum Action {
  open = 'open',
  close = 'close',
  move = 'move',
}

export interface DoorActionData {
  doorId: string;
  action: Action;
  angleTo?: number;
}
