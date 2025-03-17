import axios, { AxiosError } from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { z } from 'zod';
import { Request, Result } from "@dddforum/core";
import { DTOs as MemberDTOs } from "./members";
import { DTOs as CommentDTOs } from "./comments";
import { ApplicationErrors } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";

export namespace Inputs {
  export type CreatePostInput = {
    title: string;
    memberId: string;
    content?: string;
    link?: string;
    postType: Types.PostType
  }
}

export namespace Queries {

  export class GetPostByIdQuery {
    constructor(private props: { postId: string }) {}
  
    static fromRequest(req: Request) {
      const postId = req['query'].postId || req['params'].postId;
  
      if (!postId) {
        throw new ServerErrors.MissingRequestParamsError(["postId"]);
      }
  
      return new GetPostByIdQuery({ postId: postId as string });
    }
  
    get postId() {
      return this.props.postId;
    }
  }

  export type GetPostsQueryOption = 'popular' | 'recent';
  export type GetPostsQueryInput = { sort: GetPostsQueryOption }
  export class GetPostsQuery {

    constructor(private props: GetPostsQueryInput) {}

    public static create (option: GetPostsQueryOption) {
      return new GetPostsQuery({ sort: option })
    }
  
    static fromRequest(query: Request["query"]) {
      const { sort } = query;
      console.log()
  
      if (!sort) {
        throw new ServerErrors.MissingRequestParamsError(["sort"]);
      }
  
      if (sort !== "recent" && sort !== "popular") {
        throw new ServerErrors.InvalidRequestParamsError(["sort"]);
      }
  
      return new GetPostsQuery({ sort });
    }
  
    get sort() {
      return this.props.sort;
    }
  }
}

export namespace Commands {

  export class CreatePostCommand {
    private props: Inputs.CreatePostInput;

    private constructor(props: Inputs.CreatePostInput) {
      this.props = props;
    }

    getProps() {
      return this.props;
    }

    public static create(input: Inputs.CreatePostInput): Result<CreatePostCommand, ApplicationErrors.ValidationError> {
      const schema = z.object({
        title: z.string().min(6, 'Title is required'),
        memberId: z.string(),
        content: z.string().min(5, 'Content must be at least 5 characters').optional(),
        link: z.string().url('Link must be a valid URL').optional(),
        postType: z.enum(['text', 'link'])
      }).refine(data => {
        if (data.postType === 'text' && !data.content) {
          return false;
        }
        if (data.postType === 'link' && !data.link) {
          return false;
        }
        return true;
      }, {
        message: "Content required for text posts, link required for link posts"
      });

      try {
        const result = schema.parse(input);
        return Result.success(new CreatePostCommand(result as Inputs.CreatePostInput));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const missingKeys = error.errors.map(err => err.path.join('.')).join(', ');
          return Result.failure(new ApplicationErrors.ValidationError(`Missing or invalid fields: ${missingKeys}`));
        }
        return Result.failure(new ApplicationErrors.ValidationError("Validation error"));
      }
    }

    public static fromRequest(body: Request['body']): Result<CreatePostCommand, ServerErrors.MissingRequestParamsError> {
      const { title, postType, memberId } = body;
  
      if (!memberId) {
        return Result.failure(new ServerErrors.MissingRequestParamsError(["memberId"]));
      }
  
      if (!title) {
        return Result.failure(new ServerErrors.MissingRequestParamsError(["title"]));
      }
  
      if (!postType) {
        return Result.failure(new ServerErrors.MissingRequestParamsError(["postType"]));
      }
  
      return Result.success(new CreatePostCommand({ ...body }));
    }
  }
}

export namespace Types {
  export type PostType = 'link' | 'text';
}

export namespace DTOs {
  export type PostDTO = {
    id: string;
    postType: string;
    title: string;
    content?: string;
    link?: string;
    dateCreated: string;
    member: MemberDTOs.MemberDTO;
    comments: CommentDTOs.CommentDTO[];
    voteScore: number;
    lastUpdated: string;
  };
}

export namespace Errors {

  // TODO: define errors
  export type GetPostsErrors = '';

  export type CreatePostErrors = '';

  export type GetPostByIdErrors = '';

  export type AnyPostError = 
    ServerErrors.AnyServerError |
    ApplicationErrors.AnyApplicationError
}

export namespace API {
  export type GetPostsAPIResponse = APIResponse<DTOs.PostDTO[], Errors.GetPostsErrors>;

  export type CreatePostAPIResponse = APIResponse<DTOs.PostDTO, Errors.CreatePostErrors>;

  export type GetPostByIdAPIResponse = APIResponse<DTOs.PostDTO, Errors.GetPostByIdErrors>;

  export type AnyPostsAPIResponse = 
    GetPostsAPIResponse | 
    CreatePostAPIResponse | 
    Errors.AnyPostError; // TODO: this pattern throughout
    // TODO: tidy functional errors; see users.ts
}

export const createPostsAPI = (apiURL: string) => {

  return {
    create: async (input: Inputs.CreatePostInput, authToken: string): Promise<API.CreatePostAPIResponse> => {
      try {
        const successResponse = await axios.post(
          `${apiURL}/posts/new`, 
          input, 
          getAuthHeaders(authToken)
        );
        return successResponse.data as API.CreatePostAPIResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as API.CreatePostAPIResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as API.CreatePostAPIResponse;
      }
    },
    getPosts: async (sort: Queries.GetPostsQueryInput): Promise<API.GetPostsAPIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=${sort.sort}`);
        return successResponse.data as API.GetPostsAPIResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as API.GetPostsAPIResponse;
        }
        return {
          data: [],
          error: "Unknown error",
          success: false
        } as API.GetPostsAPIResponse;
      }
    },
    getPostById: async (postId: string): Promise<API.GetPostByIdAPIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts/${postId}`);
        return successResponse.data as API.GetPostByIdAPIResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as API.GetPostByIdAPIResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as API.GetPostByIdAPIResponse;
      }
    }
  };
};
