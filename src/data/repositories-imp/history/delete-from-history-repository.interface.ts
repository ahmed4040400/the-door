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
    await this.doorUserDataSource.updateUserById(doorToUpdate.id, doorToUpdate);

    return deletedEvent;
  }

  private removeEventFromArray(eventId: string, eventsArray: Array<string>) {
    // TODO: handle the value does not exist in the array error
    const i = eventsArray.indexOf(eventId);
    if (i === -1) throw new Error();
    return eventsArray.splice(i, 1);
  }
}
