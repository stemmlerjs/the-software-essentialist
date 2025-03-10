import axios from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { z } from 'zod';
import { Request } from 'express'
import { MemberDTO } from "./members";
import { CommentDTO } from "./comments";
import { ApplicationErrors } from "../errors/application";
import { GenericApplicationOrServerError } from "../errors";

export namespace Queries {

  export class GetPostByIdQuery {
    constructor(private props: { postId: string }) {}
  
    static fromRequest(req: Request) {
      const postId = req['query'].postId || req['params'].postId;
  
      if (!postId) {
        throw new ServerErrors.MissingRequestParamsException(["postId"]);
      }
  
      return new GetPostByIdQuery({ postId: postId as string });
    }
  
    get postId() {
      return this.props.postId;
    }
  }

  export type GetPostsQueryInput = { sort: 'popular' | 'recent'; }
  export class GetPostsQuery {

    constructor(private props: GetPostsQueryInput) {}
  
    static fromRequest(query: Request["query"]) {
      const { sort } = query;
  
      console.log("sort", sort);
  
      if (!sort) {
        throw new ServerErrors.MissingRequestParamsException(["sort"]);
      }
  
      if (sort !== "recent" && sort !== "popular") {
        throw new ServerErrors.InvalidRequestParamsException(["sort"]);
      }
  
      return new GetPostsQuery({ sort });
    }
  
    get sort() {
      return this.props.sort;
    }
  }
}

export namespace Commands {

  export type CreatePostInput = {
    title: string;
    content?: string;
    link?: string;
  }

  export class CreatePostsCommand {
    private props: CreatePostInput;

    private constructor(props: CreatePostInput) {
      this.props = props;
    }

    getProps() {
      return this.props;
    }

    public static create(input: CreatePostInput) {
      const schema = z.object({
        title: z.string().min(1, 'Title is required'),
        content: z.string().optional(),
        link: z.string().optional()
      }).refine(data => {
        if (!data.content && !data.link) {
          return false;
        }
        return true;
      }, {
        message: "Either content or link must be provided"
      });

      try {
        const result = schema.parse(input);
        return new CreatePostsCommand(result);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ApplicationErrors.ValidationError(error.errors[0].message);
        }
        throw error;
      }
    }
  }
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

// TODO: tidy functional errors; see users.ts
export type GetPostsErrors = GenericApplicationOrServerError;

export type GetPostsAPIResponse = APIResponse<PostDTO[], GetPostsErrors>;

export type CreatePostErrors = GenericApplicationOrServerError;

export type CreatePostAPIResponse = APIResponse<PostDTO, CreatePostErrors>;

export type GetPostByIdErrors = GenericApplicationOrServerError;

export type GetPostByIdAPIResponse = APIResponse<PostDTO, GetPostByIdErrors>

export type PostsAPIResponse = 
    GetPostsAPIResponse 
  | CreatePostAPIResponse;


export const createPostsAPI = (apiURL: string) => {

  return {
    create: async (command: Commands.CreatePostInput, authToken: string): Promise<CreatePostAPIResponse> => {
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
    getPosts: async (sort: Queries.GetPostsQueryInput): Promise<GetPostsAPIResponse> => {
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
