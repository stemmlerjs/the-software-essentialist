import axios from 'axios';
import { APIResponse } from ".";
import { GenericApplicationOrServerError, ServerErrors } from "@dddforum/errors";
import { Request } from "express";


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
        throw new ServerErrors.MissingRequestParamsException(["commentId"]);
      }
  
      if (!voteType) {
        throw new ServerErrors.MissingRequestParamsException(["voteType"]);
      }
  
      if (!memberId) {
        throw new ServerErrors.MissingRequestParamsException(["memberId"]);
      }
  
      return new VoteOnCommentCommand({ ...body });
    }
  }
  
  export class VoteOnPostCommand {
    constructor(public props: Inputs.VoteOnPostInput) {}
  
    static fromRequest(body: Request['body']) {
      const { voteType, postId, memberId } = body;
  
      if (!postId) {
        throw new ServerErrors.MissingRequestParamsException(["postId"]);
      }
  
      if (!voteType) {
        throw new ServerErrors.MissingRequestParamsException(["voteType"]);
      }
  
      if (!memberId) {
        throw new ServerErrors.MissingRequestParamsException(["memberId"]);
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

// TODO: organize into API type; do for all
export type VoteOnPostAPIResponse = APIResponse<DTOs.PostVoteDTO, GenericApplicationOrServerError>

export const createVotesAPI = (apiUrl: string) => {
  return {
    // TODO: ensure all of these are called "inputs"
    voteOnPost: async (input: Inputs.VoteOnPostInput, authToken: string): Promise<VoteOnPostAPIResponse> => {
      try {
        const successResponse = await axios.post(`${apiUrl}/votes/post/${input.postId}/new`, input, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        return successResponse.data as APIResponse<DTOs.PostVoteDTO, GenericApplicationOrServerError>;
      } catch (err) {
        // TODO: Don't do this, type it strictly. Fix for all
        //@ts-expect-error
        return err.response.data as APIResponse<DTOs.PostVoteDTO, GenericApplicationOrServerError>;
      }
    }
  }
}
