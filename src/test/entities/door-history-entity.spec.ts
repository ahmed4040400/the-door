import { LackOfInputDataError } from '../../base/errors/input-data-missing.error';
import { DoorHistoryEntity } from '../../entities/door-history.entity';
import { DoorEventDataStunt } from '../fixtures/event-input-data-fixture';

describe('door event history entity', () => {
  let historyEntity: DoorHistoryEntity;
  let doorEventInDataStump: DoorEventDataStunt;

  beforeEach(async () => {
    doorEventInDataStump = new DoorEventDataStunt();
    historyEntity = new DoorHistoryEntity();
  });

  it('getOutData() return expected data', () => {
    const result = historyEntity.getOutData(doorEventInDataStump.inputData);
    const expectedResult = doorEventInDataStump.calculateDoorEventData();

    doorEventInDataStump.inputData.angleTo = 180;
    const result2 = historyEntity.getOutData(doorEventInDataStump.inputData);
    const expectedResult2 = doorEventInDataStump.calculateDoorEventData();

    expect(result).toEqual(expectedResult);
    expect(result2).toEqual(expectedResult2);
  });

  describe('throws when instantiating the entity with missing data', () => {
    it('missing angleFrom property', () => {
      const shouldThrow = jest.fn(() => {
        doorEventInDataStump.inputData.angleFrom = undefined;
        historyEntity.getOutData(doorEventInDataStump.inputData);
      });
      const expectedError = new LackOfInputDataError(
        'element angleFrom is empty',
      );
      expect(shouldThrow).toThrowError(expectedError);
    });

    it('missing angleTo property', () => {
      const shouldThrow = jest.fn(() => {
        doorEventInDataStump.inputData.angleTo = undefined;
        historyEntity.getOutData(doorEventInDataStump.inputData);
      });
      const expectedError = new LackOfInputDataError(
        'element angleTo is empty',
      );
      expect(shouldThrow).toThrowError(expectedError);
    });

    it('missing doorId property', () => {
      const shouldThrow = jest.fn(() => {
        doorEventInDataStump.inputData.doorId = undefined;
        historyEntity.getOutData(doorEventInDataStump.inputData);
      });
      const expectedError = new LackOfInputDataError('element doorId is empty');
      expect(shouldThrow).toThrowError(expectedError);
    });

    it('missing event property', () => {
      const shouldThrow = jest.fn(() => {
        doorEventInDataStump.inputData.event = undefined;
        historyEntity.getOutData(doorEventInDataStump.inputData);
      });
      const expectedError = new LackOfInputDataError('element event is empty');
      expect(shouldThrow).toThrowError(expectedError);
    });
  });
});
