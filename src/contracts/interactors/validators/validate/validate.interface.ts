export interface IIsValid {
  isEmail(email: string): Promise<boolean>;
  isOneOf(event: string, words: string[]): Promise<boolean>;
  isNumber(value: number): Promise<boolean>;
  min(value: number, minimumValue: number): Promise<boolean>;
  max(value: number, maximumValue: number): Promise<boolean>;
  inRange(value: number, min: number, max: number);
}
