
import axios from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { GenericApplicationOrServerError } from "@dddforum/errors";

export namespace DTOs {
  export type MemberDTO = {
    userId: string;
    memberId: string
    username: string;
    reputationLevel: string;
    reputationScore: number;
  }
}

export namespace Types {
  export const MemberRoles = {
    Level1: 'Level1',
    Level2: 'Level2'
  }
}

export namespace Inputs {
  export type CreateMemberInput = { 
    username: string; 
    email: string; 
    userId: string;
  }
}

type CreateMemberErrors = 
  // TODO: put any specific application types of errors here; see users.ts
  GenericApplicationOrServerError

export type CreateMemberAPIResponse = APIResponse<DTOs.MemberDTO, CreateMemberErrors>

export const createMembersAPI = (apiURL: string) => {
  return {
    create: async (command: Inputs.CreateMemberInput, authToken: string) => {
      try {
        const successResponse = await axios.post(
          `${apiURL}/members/new`, 
          command, 
          getAuthHeaders(authToken)
        );
        return successResponse.data as CreateMemberAPIResponse;
      } catch (err) {
        //@ts-expect-error
        return err.response.data as CreatePostAPIResponse;
      }
    }
  }
}