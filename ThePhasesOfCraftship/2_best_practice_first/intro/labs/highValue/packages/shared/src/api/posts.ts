
import axios from 'axios';
import { APIResponse } from '.';

export type GetPostsQueryOptions = 'recent'

export type GetPostsQuery = {
  sort: GetPostsQueryOptions
}

export type GetPostsData = {

}

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: async (): Promise<APIResponse<GetPostsData>> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=recent`)
        return successResponse.data as APIResponse<GetPostsData>;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    }
  }
}