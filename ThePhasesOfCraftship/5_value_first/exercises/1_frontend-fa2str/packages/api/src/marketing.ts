import axios, { AxiosError } from "axios";
import { APIResponse } from ".";
import { ServerErrors } from "@dddforum/errors/server";
import { ApplicationErrors } from "@dddforum/errors/application";

export namespace API {
  export type AddEmailToListResponse = APIResponse<boolean, Errors.AddEmailToListErrors>;

  export type AnyMarketingAPIResponse = AddEmailToListResponse
}

export namespace Errors {
  export type AddEmailToListErrors = '';
  
  export type AnyMarketingError = 
    ServerErrors.AnyServerError |
    ApplicationErrors.AnyApplicationError;
}

export const createMarketingAPI = (apiURL: string) => {
  return {
    addEmailToList: async (email: string): Promise<API.AddEmailToListResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/marketing/new`, {
          email,
        });
        return successResponse.data as API.AddEmailToListResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as API.AddEmailToListResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as API.AddEmailToListResponse;
      }
    },
  };
};
