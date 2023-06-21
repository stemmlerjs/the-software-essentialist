
import { ValueObject } from "../../../shared/domain/valueObject";

type UsernameState = string;

export class Username extends ValueObject<UsernameState> {
  
  constructor (value: string) {
    super(value)
  }

  public static create (value: string) {
    // validate
    return new Username(value);
  }
}