
import axios from 'axios';
import { APIResponse } from '.';

export type GetPostsQueryOptions = 'recent'

export type GetPostsQuery = {
  sort: GetPostsQueryOptions
}

// TODO: Refactor to using dtos
export type PostsData = {
  posts: []
};

export type ServerError = {};

export type GetPostsResponse = PostsData | ServerError;

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: async (): Promise<APIResponse<GetPostsResponse>> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=recent`);
        return successResponse.data as any;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    }
  }
}

