import { IHistoryDataSource } from 'src/contracts/data/data-sources/history-data-source.interface';
import { IGetFromHistoryByEventIdRepository } from 'src/contracts/data/repositories/history/get-from-history-by-event-id-repository.interface';
import { DoorEventOutData } from 'src/entities/dtos/door-event/door-event-output';

export class GetFromHistoryByEventIdRepository
  implements IGetFromHistoryByEventIdRepository
{
  constructor(private historyDataSource: IHistoryDataSource) {}
  getEvent(eventId: string): Promise<DoorEventOutData> {
    return this.historyDataSource.getEventById(eventId);
  }
}
