import axios from "axios";
import { APIResponse, ServerError } from ".";
import { User } from "./users";

type GetPostsSortOption = 'recent'; 

export type GetPostsParams = {
  sort: GetPostsSortOption;
};

export type Vote = { id: number, postId: number, voteType: 'Upvote' | 'Downvote' };

export type Comment = object;

export type Post = {
  id: number;
  memberId: number;
  memberPostedBy: {
    user: User
  };
  votes: Vote[];
  comments: Comment[];
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
    getPosts: async (sort: GetPostsSortOption): Promise<PostsResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=${sort}`);
        return successResponse.data as GetPostsResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as GetPostsResponse;
      }
    },
  };
};
