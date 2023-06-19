
import { DomainError } from "./domainError";

export class ValidationError extends DomainError {
  constructor (invalidProperty: string) {
    super({
      errorType: 'ValidationError',
      message: `Validation error for '${invalidProperty}'`
    })
  }
}
