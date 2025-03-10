import { ApplicationErrors } from './application';
import { ServerErrors } from './server';

export * from './application'
export * from './server';

export class CustomError extends Error {
  public type: string;
  constructor(message: string, type: string = "CustomError") {
    super(message);
    this.type = type;
  }
}

export type GenericApplicationOrServerError = 
  ApplicationErrors.AnyApplicationError
| ServerErrors.AnyServerError;