import { UseCase } from 'src/base/use-case.interface';
import { DoorActionData } from 'src/entities/dtos/door-action/door-action';

export interface IOpenDoor extends UseCase {
  execute(doorOwnerId: string, doorId: string): Promise<DoorActionData>;
}
