import axios from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { z } from 'zod';
import { Request } from 'express'
import { DTOs as MemberDTOs } from "./members";
import { DTOs as CommentDTOs } from "./comments";
import { ApplicationErrors } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";
import { GenericApplicationOrServerError } from "@dddforum/errors";

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
        throw new ServerErrors.MissingRequestParamsException(["postId"]);
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

  export class CreatePostCommand {
    private props: Inputs.CreatePostInput;

    private constructor(props: Inputs.CreatePostInput) {
      this.props = props;
    }

    getProps() {
      return this.props;
    }

    public static create(input: Inputs.CreatePostInput) {
      const schema = z.object({
        title: z.string().min(1, 'Title is required'),
        memberId: z.string(),
        content: z.string().optional(),
        link: z.string().optional(),
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
        return new Commands.CreatePostCommand(result);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ApplicationErrors.ValidationError(error.errors[0].message);
        }
        throw error;
      }
    }

    public static fromRequest(body: Request['body']) {
      const { title, postType, memberId } = body;
  
      if (!memberId) {
        throw new ServerErrors.MissingRequestParamsException(["memberId"]);
      }
  
      if (!title) {
        throw new ServerErrors.MissingRequestParamsException(["title"]);
      }
  
      if (!postType) {
        throw new ServerErrors.MissingRequestParamsException(["postType"]);
      }
  
      return new CreatePostCommand({ ...body });
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

// TODO: tidy functional errors; see users.ts
// Errors
export type GetPostsErrors = GenericApplicationOrServerError;

export type CreatePostErrors = GenericApplicationOrServerError;

export type GetPostByIdErrors = GenericApplicationOrServerError;


export namespace API {
  export type GetPostsAPIResponse = APIResponse<DTOs.PostDTO[], GetPostsErrors>;

  export type CreatePostAPIResponse = APIResponse<DTOs.PostDTO, CreatePostErrors>;

  export type GetPostByIdAPIResponse = APIResponse<DTOs.PostDTO, GetPostByIdErrors>;

  export type AnyPostsAPIResponse = 
    GetPostsAPIResponse 
  | CreatePostAPIResponse;
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
      } catch (err) {
        //@ts-expect-error
        return err.response.data as CreatePostAPIResponse;
      }
    },
    getPosts: async (sort: Queries.GetPostsQueryInput): Promise<API.GetPostsAPIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=${sort}`);
        return successResponse.data as API.GetPostsAPIResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as API.GetPostsAPIResponse;
      }
    },
    getPostById: async (postId: string): Promise<API.GetPostByIdAPIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts/${postId}`);
        return successResponse.data as API.GetPostByIdAPIResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as API.GetPostByIdAPIResponse;
      }
    }
  };
};
