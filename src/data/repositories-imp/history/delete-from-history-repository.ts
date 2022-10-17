import { NotFoundError } from '../../../base/errors/not-found.error';
import { IDoorUserDataSource } from 'src/contracts/data/data-sources/door-user-data-source.interface';
import { IHistoryDataSource } from 'src/contracts/data/data-sources/history-data-source.interface';
import { IDeleteFromHistoryRepository } from 'src/contracts/data/repositories/history/delete-from-history-repository.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export class DeleteFromHistoryRepository
  implements IDeleteFromHistoryRepository
{
  constructor(
    private historyDataSource: IHistoryDataSource,
    private doorUserDataSource: IDoorUserDataSource,
  ) {}

  async deleteEvent(eventId: string): Promise<DoorEventOutData> {
    const deletedEvent = await this.historyDataSource.deleteEventById(eventId);
    const doorToUpdate = await this.doorUserDataSource.getDoorUserById(
      deletedEvent.doorId,
    );

    this.removeEventFromArray(deletedEvent.id, doorToUpdate.history);
    await this.doorUserDataSource.updateDoorUserById(
      doorToUpdate.id,
      doorToUpdate,
    );

    return deletedEvent;
  }

  private removeEventFromArray(eventId: string, eventsArray: Array<string>) {
    const i = eventsArray.indexOf(eventId);
    this.throwIfEmpty(i, eventId);
    return eventsArray.splice(i, 1);
  }

  private throwIfEmpty(eventIndex: number, eventId) {
    if (eventIndex === -1) {
      throw new NotFoundError(`Event ${eventId} not found in the user`);
    }
  }
}
