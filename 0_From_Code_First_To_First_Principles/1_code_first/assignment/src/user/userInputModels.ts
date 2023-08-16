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

export interface EditUserRequestParams {
  userId: string;
}

export interface GetUserByEmailRequest {
  email: string;
}

export interface UserResponse {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}
