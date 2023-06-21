
import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { Identifier } from "../../../shared/domain/identifier";
import { FirstName } from "./firstName";
import { LastName } from "./lastName";
import { UserEmail } from "./userEmail";
import { Username } from "./username";

export interface UserInput {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  id: string;
}

export interface UserState {
  id: Identifier;
  email: UserEmail;
  username: Username;
  firstName: FirstName;
  lastName: LastName;
}

export class User extends AggregateRoot {

  private state: UserState;

  constructor (state: UserState){
    super();
    this.state = state;
  }
  
  public static create (userInput: UserInput) {
    return new User({
      id: Identifier.create(userInput.id),
      email: UserEmail.create(userInput.email),
      username: Username.create(userInput.username),
      firstName: FirstName.create(userInput.firstName),
      lastName: LastName.create(userInput.lastName)
    })
  }
}