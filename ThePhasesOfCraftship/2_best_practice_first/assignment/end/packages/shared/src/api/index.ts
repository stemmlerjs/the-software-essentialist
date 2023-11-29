
import { createPostsAPI } from './posts'
import { createUsersAPI } from './users'

export const createAPI = (apiURL: string) => {
  return {
    posts: createPostsAPI(apiURL),
    users: createUsersAPI(apiURL)
  }
}