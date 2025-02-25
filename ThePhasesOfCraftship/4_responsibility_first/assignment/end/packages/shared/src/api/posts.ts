import axios from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { ServerError } from "../errors";
import { PostType } from "@dddforum/backend/src/modules/posts/domain/postType";

export type GetPostsQueryOption = 'popular' | 'recent';

export type GetPostsParams = {
  sort: GetPostsQueryOption
};

export type MemberDTO = {
  memberId: string
  username: string;
}

export type PostDTO = {
  id: string;
  postType: string;
  title: string;
  content?: string;
  link?: string;
  dateCreated: string;
  member: MemberDTO;
  comments: CommentDTO[];
  voteScore: number;
  lastUpdated: string;
};

export type CommentDTO = {
  id: string;
  text: string;
  dateCreated: string;
  member: MemberDTO;
};

export type GetPostsErrors = ServerError;

export type GetPostsAPIResponse = APIResponse<PostDTO[], GetPostsErrors>;

export type CreatePostErrors = ServerError;

export type CreatePostAPIResponse = APIResponse<PostDTO, CreatePostErrors>;

export type GetPostByIdErrors = ServerError;

export type GetPostByIdAPIResponse = APIResponse<PostDTO, GetPostByIdErrors>

export type PostsAPIResponse = 
    GetPostsAPIResponse 
  | CreatePostAPIResponse;

// clean
export type CreatePostInput = {
  title: string;
  postType: PostType
  memberId: string;
  content?: string;
  link?: string;
}

export const createPostsAPI = (apiURL: string) => {

  return {
    create: async (command: CreatePostInput, authToken: string): Promise<CreatePostAPIResponse> => {
      try {
        const successResponse = await axios.post(
          `${apiURL}/posts/new`, 
          command, 
          getAuthHeaders(authToken)
        );
        return successResponse.data as CreatePostAPIResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as CreatePostAPIResponse;
      }
    },
    getPosts: async (sort: GetPostsQueryOption): Promise<GetPostsAPIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=${sort}`);
        return successResponse.data as GetPostsAPIResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as GetPostsAPIResponse;
      }
    },
    getPostById: async (postId: string): Promise<GetPostByIdAPIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts/${postId}`);
        return successResponse.data as GetPostByIdAPIResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as GetPostByIdAPIResponse;
      }
    }
  };
};
