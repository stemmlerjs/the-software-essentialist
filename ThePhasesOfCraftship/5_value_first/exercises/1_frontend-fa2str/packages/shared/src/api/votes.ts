import axios from 'axios';
import { APIResponse } from ".";
import { GenericApplicationOrServerError } from '../errors';

export type VoteType = 'upvote' | 'downvote';

export type VoteOnCommentInput = {
  commentId: string;
  voteType: VoteType;
  memberId: string;
}

export type VoteOnPostInput = {
  postId: string;
  voteType: VoteType;
  memberId: string;
}

export type PostVoteDTO = {
  postId: string;
  memberId: string;
  voteType: VoteType;
}

export type VoteOnPostAPIResponse = APIResponse<PostVoteDTO, GenericApplicationOrServerError>

export const createVotesAPI = (apiUrl: string) => {
  return {
    voteOnPost: async (command: VoteOnPostInput, authToken: string): Promise<VoteOnPostAPIResponse> => {
      try {
        const successResponse = await axios.post(`${apiUrl}/votes/post/${command.postId}/new`, command, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        return successResponse.data as APIResponse<PostVoteDTO, GenericApplicationOrServerError>;
      } catch (err) {
        // TODO: Don't do this, type it strictly. Fix for all
        //@ts-expect-error
        return err.response.data as APIResponse<PostVoteDTO, GenericApplicationOrServerError>;
      }
    }
  }
}
