
import axios from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { MemberDTO } from "./posts";
import { ServerError } from "../errors";

export const MemberRoles = {
  Level1: 'Level1',
  Level2: 'Level2'
}

export type CreateMemberInput = { 
  username: string; 
  email: string; 
  userId: string;
  allowMarketingEmails: boolean;
}

// TODO: Fix all types for errors
type CreateMemberErrors = ServerError

export type CreateMemberAPIResponse = APIResponse<MemberDTO, CreateMemberErrors>

export const createMembersAPI = (apiURL: string) => {
  return {
    create: async (command: CreateMemberInput, authToken: string) => {
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