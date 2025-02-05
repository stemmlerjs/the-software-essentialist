import axios from "axios";
import { APIResponse, ServerError } from ".";

export type GetPostsQueryOption = 'popular' | 'recent';

export type GetPostsParams = {
  sort: GetPostsQueryOption
};

export type MemberDTO = {
  memberId: string
}

export type PostDTO = {
  id: string;
  memberId: number;
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
  member: MemberDTO;
};

export type GetPostErrors = ServerError;

export type GetPostsResponse = APIResponse<PostDTO[], GetPostErrors>;

export type PostsResponse = GetPostsResponse;

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: async (sort: GetPostsQueryOption): Promise<PostsResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=${sort}`);
        console.log(successResponse)
        return successResponse.data as GetPostsResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as GetPostsResponse;
      }
    },
  };
};
