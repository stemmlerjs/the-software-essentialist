export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface EditUserRequest {
  email?: string;
  name?: string;
  password?: string;
}
