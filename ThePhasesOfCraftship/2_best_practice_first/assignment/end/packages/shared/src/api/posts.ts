
import axios from 'axios';
import { APIResponse } from '.';

export type GetPostsQueryOptions = 'recent'

export type GetPostsQuery = {
  sort: GetPostsQueryOptions
}

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: async (): Promise<APIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=recent`)
        return successResponse.data as APIResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    }
  }
}