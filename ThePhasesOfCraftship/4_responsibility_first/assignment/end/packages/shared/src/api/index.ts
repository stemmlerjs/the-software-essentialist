import { createUsersAPI } from "./users";
import { createMarketingAPI } from "./marketing";
import { createPostsAPI } from "./posts";
import { createVotesAPI } from "./votes";
import { createMembersAPI } from "./members";

export type Error<U> = {
  message?: string;
  code?: U;
};

export type APIResponse<T, U> = {
  success: boolean;
  data: T;
  error?: Error<U>;
};

export const getAuthHeaders = (token?: string) => ({
  headers: token ? {
    Authorization: `Bearer ${token}`
  } : {}
});

export const createAPIClient = (apiURL: string) => {
  return {
    members: createMembersAPI(apiURL),
    marketing: createMarketingAPI(apiURL),
    posts: createPostsAPI(apiURL),
    votes: createVotesAPI(apiURL),
  };
};

export type APIClient = ReturnType<typeof createAPIClient>;
export * as Users from "./users"
export * as Marketing from "./marketing"
export * as Posts from "./posts";
export * as Members from './members';
