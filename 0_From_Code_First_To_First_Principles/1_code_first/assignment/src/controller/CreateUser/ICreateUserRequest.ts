export interface ICreateUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export class CreateUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;

  constructor(user: ICreateUserRequest) {
    this.email = user.email;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
