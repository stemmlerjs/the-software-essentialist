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

  constructor(ICreateUserRequest: ICreateUserRequest) {
    this.email = ICreateUserRequest.email;
    this.username = ICreateUserRequest.username;
    this.firstName = ICreateUserRequest.firstName;
    this.lastName = ICreateUserRequest.lastName;
  }
}
