import { AxiosError, AxiosResponse } from 'axios';
import { Response } from '../types/Response';

export const axiosResponded = async <T>(
  request: () => Promise<AxiosResponse<Response<T>>>
) => {
  try {
    const { data: result } = await request();

    return result;
  } catch (e) {
    return (e as AxiosError<Response<T>>).response!.data;
  }
};
