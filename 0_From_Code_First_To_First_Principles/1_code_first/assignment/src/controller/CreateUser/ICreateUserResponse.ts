interface ICreateUserResponseData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ICreateUserResponse {
  error: string | undefined;
  data: ICreateUserResponseData | undefined;
  success: boolean;
}
