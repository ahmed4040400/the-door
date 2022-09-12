export class NotAuthorizedError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
