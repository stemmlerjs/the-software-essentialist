
import axios from 'axios';
import { APIResponse } from '.';

export const createMarketingAPI = (apiURL: string) => {
  return {
    addEmailToList: async (email: string): Promise<APIResponse<undefined>> => {
      try {
        const successResponse = await axios.post(`${apiURL}/marketing/new`, {
          email
        })
        return successResponse.data as APIResponse<undefined>;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    }
  }
}