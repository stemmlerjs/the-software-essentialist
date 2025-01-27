import axios from "axios";
import { APIResponse, ServerError } from ".";

export type GetPostsParams = {
  sort: string;
};

export type Post = {
  id: number;
  memberId: number;
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
};

export type GetPostErrors = ServerError;

export type GetPostsResponse = APIResponse<Post[], GetPostErrors>;

export type PostsResponse = GetPostsResponse;

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: async (sort: string): Promise<PostsResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=${sort}`);
        return successResponse.data as GetPostsResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as GetPostsResponse;
      }
    },
  };
};
