export class EmailAlreadyInUseException extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'EmailAlreadyInUseException';
  }
}
