
import axios from 'axios';
import { APIResponse } from '.';

export const createMarketingAPI = (apiURL: string) => {
  return {
    addEmailToList: async (email: string): Promise<APIResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/marketing/new`, {
          email
        })
        return successResponse.data as APIResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    }
  }
}