
import axios from "axios";
import { APIResponse } from ".";
import { GenericApplicationOrServerError } from "@dddforum/errors";

export type AddEmailToListErrors = GenericApplicationOrServerError;
export type AddEmailToListResponse = APIResponse<boolean, AddEmailToListErrors>;

export type MarketingResponse = APIResponse<
  AddEmailToListResponse | null,
  AddEmailToListErrors
>;

export const createMarketingAPI = (apiURL: string) => {
  return {
    addEmailToList: async (email: string): Promise<AddEmailToListResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/marketing/new`, {
          email,
        });
        return successResponse.data as AddEmailToListResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as APIResponse;
      }
    },
  };
};
