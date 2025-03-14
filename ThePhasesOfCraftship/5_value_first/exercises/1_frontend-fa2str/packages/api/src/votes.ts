import axios, { AxiosError } from 'axios';
import { APIResponse } from ".";
import { ServerErrors } from "@dddforum/errors/server";
import { ApplicationErrors} from '@dddforum/errors/application'
import { Request } from "@dddforum/core";


export namespace Commands {

  export class UpdateMemberReputationScoreCommand {
    constructor(
      public readonly props: {
        memberId: string;
      }
    ) {}
  }

  export class VoteOnCommentCommand {
    constructor(public props: Inputs.VoteOnCommentInput) {}
  
    static fromRequest(body: Request['body']) {
      const { voteType, commentId, memberId } = body;
  
      if (!commentId) {
        throw new ServerErrors.MissingRequestParamsError(["commentId"]);
      }
  
      if (!voteType) {
        throw new ServerErrors.MissingRequestParamsError(["voteType"]);
      }
  
      if (!memberId) {
        throw new ServerErrors.MissingRequestParamsError(["memberId"]);
      }
  
      return new VoteOnCommentCommand({ ...body });
    }
  }
  
  export class VoteOnPostCommand {
    constructor(public props: Inputs.VoteOnPostInput) {}
  
    static fromRequest(body: Request['body']) {
      const { voteType, postId, memberId } = body;
  
      if (!postId) {
        throw new ServerErrors.MissingRequestParamsError(["postId"]);
      }
  
      if (!voteType) {
        throw new ServerErrors.MissingRequestParamsError(["voteType"]);
      }
  
      if (!memberId) {
        throw new ServerErrors.MissingRequestParamsError(["memberId"]);
      }
  
      return new VoteOnCommentCommand({ ...body });
    }
  }

}

export namespace Types {

  export type VoteType = 'upvote' | 'downvote';

}

export namespace Inputs {

  // TODO: separate all inputs from commands; they're different - do this for all domains
  export type VoteOnCommentInput = {
    commentId: string;
    voteType: Types.VoteType;
    memberId: string;
  }

  export type VoteOnPostInput = {
    postId: string;
    voteType: Types.VoteType;
    memberId: string;
  }
}

export namespace DTOs {

  export type PostVoteDTO = {
    postId: string;
    memberId: string;
    voteType: Types.VoteType;
  }

}

export namespace API {
  export type VoteOnPostAPIResponse = APIResponse<DTOs.PostVoteDTO, VoteErrors>

  export type AnyVotesAPIResponse = 
  VoteOnPostAPIResponse;
}

export type VoteErrors = 
  ServerErrors.AnyServerError |
  ApplicationErrors.AnyApplicationError

export const createVotesAPI = (apiUrl: string) => {
  return {
    // TODO: ensure all of these are called "inputs"
    voteOnPost: async (input: Inputs.VoteOnPostInput, authToken: string): Promise<API.VoteOnPostAPIResponse> => {
      try {
        const successResponse = await axios.post(`${apiUrl}/votes/post/${input.postId}/new`, input, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        return successResponse.data as API.VoteOnPostAPIResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as API.VoteOnPostAPIResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as API.VoteOnPostAPIResponse;
      }
    }
  }
}
