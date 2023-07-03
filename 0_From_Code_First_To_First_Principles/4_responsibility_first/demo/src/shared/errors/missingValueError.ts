
import { DomainError } from "./domainError";

export class MissingValueError extends DomainError {
  constructor (missingValue: string) {
    super({
      errorType: 'MissingValue',
      message: `Couldn't find the value '${missingValue}'`
    })
  }
}
