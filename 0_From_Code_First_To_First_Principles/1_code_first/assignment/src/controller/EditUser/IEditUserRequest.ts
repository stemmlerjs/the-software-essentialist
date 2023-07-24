export interface IEditUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export class IEditUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;

  constructor(user: IEditUserRequest) {
    this.email = user.email;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
