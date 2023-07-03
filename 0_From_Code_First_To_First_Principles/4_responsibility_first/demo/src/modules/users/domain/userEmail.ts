import { ValueObject } from "../../../shared/domain/valueObject";

type UserEmailState = string;

export class UserEmail extends ValueObject<UserEmailState> {
  
  constructor (value: string) {
    super(value)
  }

  public static create (value: string) {
    // validate
    return new UserEmail(value);
  }
}