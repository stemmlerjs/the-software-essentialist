interface IEditUserResponseData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IEditUserResponse {
  error: string | undefined;
  data: IEditUserResponseData | undefined;
  success: boolean;
}
