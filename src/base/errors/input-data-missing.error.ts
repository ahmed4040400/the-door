export class LackOfInputDataError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LackOfInputDataError.prototype);
  }
}
