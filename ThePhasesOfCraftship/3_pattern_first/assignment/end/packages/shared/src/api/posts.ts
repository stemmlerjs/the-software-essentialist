import axios from "axios";
import { APIResponse } from ".";
import { ServerError } from "../errors";

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
};

export type VoteDTO = {
  id: string;
  voteType: string;
}

export type CommentDTO = {
  id: string;
  text: string;
  dateCreated: string;
  member: MemberDTO;
};

export type GetPostErrors = ServerError;

export type GetPostsResponse = APIResponse<PostDTO[], GetPostErrors>;

export type CreatePostErrors = ServerError;

export type CreatePostResponse = APIResponse<void, CreatePostErrors>;

export type PostsResponse = 
  GetPostsResponse 
  | CreatePostResponse;

// clean
export type CreatePostInput = {
  title: string;
  postType: 'link' | 'text';
  memberId: string;
  content?: string;
  link?: string;
}

export type VoteType = 'upvote' | 'downvote';

export type VoteOnCommentInput = {
  commentId: string;
  voteType: VoteType;
  memberId: string;
}

export const createPostsAPI = (apiURL: string) => {
  return {
    // auth
    create: async (command: CreatePostInput, authToken: string): Promise<CreatePostResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/posts/new`, command, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        return successResponse.data as CreatePostResponse;
      } catch (err) {
        console.log(err);
        //@ts-expect-error
        return err.response.data as CreatePostResponse;
      }
    },
    getPosts: async (sort: GetPostsQueryOption): Promise<GetPostsResponse> => {
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
