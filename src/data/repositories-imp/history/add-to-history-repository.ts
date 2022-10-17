import { DoorEventOutData } from '../../../entities/dtos/door-event/door-event-output';
import { DoorEvent } from '../../../entities/dtos/door-event/door-event';
import { IAddToHistoryRepository } from '../../../contracts/data/repositories/history/add-to-history-repository.interface';
import { IHistoryDataSource } from 'src/contracts/data/data-sources/history-data-source.interface';
import { IDoorUserDataSource } from 'src/contracts/data/data-sources/door-user-data-source.interface';

export class AddToHistoryRepository implements IAddToHistoryRepository {
  constructor(
    private historyDataSource: IHistoryDataSource,
    private doorUserDataSource: IDoorUserDataSource,
  ) {}

  async addEvent(userId: string, event: DoorEvent): Promise<DoorEventOutData> {
    const doorEvent = await this.historyDataSource.addEvent(event);
    const doorUser = await this.doorUserDataSource.getDoorUserById(userId);
    doorUser.history.push(doorEvent.id);
    await this.doorUserDataSource.updateDoorUserById(doorUser.id, doorUser);
    return doorEvent;
  }
}
