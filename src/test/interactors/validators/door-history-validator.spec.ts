import { Event } from '../../../entities/dtos/door-event/door-event-input';
import { DoorHistoryValidator } from '../../../interactors/validators/door-history-validator';
import { DoorEventDataStunt } from '../../../test/fixtures/event-input-data-fixture';
import { IIsValid } from '../../../contracts/interactors/validators/validate/validate.interface';
import { InvalidInputData } from '../../../base/errors/invalid-input-data.error';
describe('door history validator', () => {
  let mockedIsValid: IIsValid;
  let doorHistoryValidator: DoorHistoryValidator;
  let doorEventData: DoorEventDataStunt;
  beforeEach(() => {
    mockedIsValid = {
      isEmail: jest.fn(() => Promise.resolve(true)),
      isOneOf: jest.fn(() => Promise.resolve(true)),
      isNumber: jest.fn(() => Promise.resolve(true)),
      min: jest.fn(() => Promise.resolve(true)),
      max: jest.fn(() => Promise.resolve(true)),
      inRange: jest.fn(() => Promise.resolve(true)),
    };

    doorEventData = new DoorEventDataStunt();
    doorHistoryValidator = new DoorHistoryValidator(mockedIsValid);
  });

  it('checks that the event is one of the 3 specified events', async () => {
    const eventInData = doorEventData.inputData;
    await doorHistoryValidator.validate(eventInData);
    expect(mockedIsValid.isOneOf).toBeCalledWith(eventInData.event, [
      Event.open,
      Event.close,
      Event.move,
    ]);
  });

  it('checks that the angelFrom is in the right rang', async () => {
    const eventInData = doorEventData.inputData;
    await doorHistoryValidator.validate(eventInData);
    expect(mockedIsValid.inRange).toBeCalledWith(eventInData.angleFrom, 0, 180);
  });

  it('checks that the angelTo is in the right rang', async () => {
    const eventInData = doorEventData.inputData;
    await doorHistoryValidator.validate(eventInData);
    expect(mockedIsValid.inRange).toBeCalledWith(eventInData.angleTo, 0, 180);
  });

  it('returns true if all the data is valid', async () => {
    const eventInData = doorEventData.inputData;
    const result = await doorHistoryValidator.validate(eventInData);
    expect(result).toEqual(true);
  });

  describe('throws if any of the data is invalid', () => {
    it('event invalid', async () => {
      mockedIsValid.isOneOf = jest.fn(() => Promise.resolve(false));

      const eventInData = doorEventData.inputData;

      const shouldThrow = jest.fn(async () => {
        await doorHistoryValidator.validate(eventInData);
      });

      expect(await shouldThrow).rejects.toThrowError(InvalidInputData);
    });

    it('angle out of range', async () => {
      mockedIsValid.inRange = jest.fn(() => Promise.resolve(false));

      const eventInData = doorEventData.inputData;

      const shouldThrow = jest.fn(async () => {
        await doorHistoryValidator.validate(eventInData);
      });

      expect(await shouldThrow).rejects.toThrowError(InvalidInputData);
    });
  });
});
