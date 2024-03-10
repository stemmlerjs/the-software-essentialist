export enum ErrorMessage {
  UsernameAlreadyTaken = 'UsernameAlreadyTaken',
  EmailAlreadyInUse = 'EmailAlreadyInUse',
  ValidationError = 'ValidationError',
  ServerError = 'ServerError',
  UserNotFound = 'UserNotFound',
}

export class ResponseDTO<T> {
  error: ErrorMessage | null;
  data: T | null;
  success: boolean;

  constructor(error: ErrorMessage | null = null, data: T | null = null) {
    this.error = error;
    this.data = data;
    this.success = !error;
  }
}
