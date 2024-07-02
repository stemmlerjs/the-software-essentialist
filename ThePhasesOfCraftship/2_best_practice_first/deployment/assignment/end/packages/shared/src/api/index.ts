import { createUsersAPI } from "./users";
import { createMarketingAPI } from "./marketing";
import { createPostsAPI } from "./posts";
import { Config } from "@dddforum/backend/src/shared/config";

export type Error<U> = {
  message?: string;
  code?: U;
};

export type APIResponse<T, U> = {
  success: boolean;
  data: T;
  error: Error<U>;
};

export type ValidationError = "ValidationError";
export type ServerError = "ServerError";
export type GenericErrors = ValidationError | ServerError;

export const createAPIClient = (config: Config) => {
  console.log('Creating API client with config', config)
  const apiURL = config.apiURL

  return {
    users: createUsersAPI(apiURL),
    marketing: createMarketingAPI(apiURL),
    posts: createPostsAPI(apiURL),
  };
};
