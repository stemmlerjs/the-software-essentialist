
import { ValueObject } from "../../../shared/domain/valueObject";

type LastNameState = string;

export class LastName extends ValueObject<LastNameState> {
  
  constructor (value: string) {
    super(value)
  }

  public static create (value: string) {
    // validate
    return new LastName(value);
  }
}