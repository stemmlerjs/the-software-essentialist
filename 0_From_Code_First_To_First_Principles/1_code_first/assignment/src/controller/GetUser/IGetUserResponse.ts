export interface IGetUserResponseData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IGetUserResponse {
  error: string | undefined;
  data: IGetUserResponseData | undefined;
  success: boolean;
}
