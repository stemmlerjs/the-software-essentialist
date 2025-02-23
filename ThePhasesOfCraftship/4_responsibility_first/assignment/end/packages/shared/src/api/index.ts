import { createUsersAPI } from "./users";
import { createMarketingAPI } from "./marketing";
import { createPostsAPI } from "./posts";

export type Error<U> = {
  message?: string;
  code?: U;
};

export type APIResponse<T, U> = {
  success: boolean;
  data: T;
  error?: Error<U>;
};

export const createAPIClient = (apiURL: string) => {
  return {
    users: createUsersAPI(apiURL),
    marketing: createMarketingAPI(apiURL),
    posts: createPostsAPI(apiURL),
  };
};

export type APIClient = ReturnType<typeof createAPIClient>;
export * as Users from "./users"
export * as Marketing from "./marketing"
export * as Posts from "./posts";
export * as Members from './members';
