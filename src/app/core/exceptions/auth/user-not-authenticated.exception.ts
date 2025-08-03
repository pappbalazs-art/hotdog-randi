export class UserNotAuthenticatedException extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'UserNotAuthenticatedException';
  }
}
