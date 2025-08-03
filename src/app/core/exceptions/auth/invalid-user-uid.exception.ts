export class InvalidUserUIDException extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'InvalidUserUIDException';
  }
}
