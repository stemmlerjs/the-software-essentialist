
import axios from "axios";
import { APIResponse } from ".";
import { ServerErrors } from "@dddforum/errors/server";
import { ApplicationErrors } from "@dddforum/errors/application";


export type AddEmailToListErrors = 
ServerErrors.AnyServerError |
ApplicationErrors.AnyApplicationError;

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
