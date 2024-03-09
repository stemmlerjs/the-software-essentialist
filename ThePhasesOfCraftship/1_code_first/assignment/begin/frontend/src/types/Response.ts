import { ApiError } from '../constants/ApiError';

export type Response<T> =
  | {
      data: T;
      success: true;
    }
  | {
      error: ApiError;
      success: false;
    };
