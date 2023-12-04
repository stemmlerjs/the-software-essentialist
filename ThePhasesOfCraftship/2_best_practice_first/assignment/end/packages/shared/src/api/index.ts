
import { createMarketingAPI } from './marketing'
import { createPostsAPI } from './posts'
import { createUsersAPI } from './users'

export type APIResponse = {
  success: boolean;
  data?: any;
  error?: string;
}

export const createAPIClient = (apiURL: string) => {
  return {
    posts: createPostsAPI(apiURL),
    users: createUsersAPI(apiURL),
    marketing: createMarketingAPI(apiURL)
  }
}