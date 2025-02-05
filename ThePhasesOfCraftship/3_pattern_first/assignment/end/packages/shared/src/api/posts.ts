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
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
  member: MemberDTO;
  comments: CommentDTO[];
  votes: VoteDTO[]
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

export type CreatePostResponse = APIResponse<PostDTO, CreatePostErrors>;

// clean
export type CreatePostInput = {
  title: string;
  postType: 'link' | 'text',
  content?: string;
  link?: string;
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
