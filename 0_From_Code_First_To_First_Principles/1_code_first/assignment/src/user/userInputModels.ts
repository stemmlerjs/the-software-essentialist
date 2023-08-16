export interface CreateUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface EditUserRequest {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}
