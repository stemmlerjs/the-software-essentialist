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

  constructor(IEditUserRequest: IEditUserRequest) {
    this.email = IEditUserRequest.email;
    this.username = IEditUserRequest.username;
    this.firstName = IEditUserRequest.firstName;
    this.lastName = IEditUserRequest.lastName;
  }
}
