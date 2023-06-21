
import { ValueObject } from "../../../shared/domain/valueObject";

type FirstNameState = string;

export class FirstName extends ValueObject<FirstNameState> {
  
  constructor (value: string) {
    super(value)
  }

  public static create (value: string) {
    // validate
    return new FirstName(value);
  }
}