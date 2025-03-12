import axios from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { Request } from "@dddforum/core";
import { ServerErrors } from '@dddforum/errors/server'
import { Types as UserTypes } from './users'

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

export namespace Commands {
  export class CreateMemberCommand {

    constructor(public props: Inputs.CreateMemberInput) {}
  
    static create (token: UserTypes.DecodedIdToken | undefined, body: Request['body']) {
      if (!token?.email) {
        throw new ServerErrors.MissingRequestParamsException(["email"]);
      }
  
      if (!token?.uid) {
        throw new ServerErrors.MissingRequestParamsException(["userId"]);
      }
  
      if (!body.username) {
        throw new ServerErrors.MissingRequestParamsException(["username"]);
      }
  
      return new CreateMemberCommand({
        userId: token.uid,
        username: body.username,
        email: token.email as string
      });
    }
  }
}

type CreateMemberErrors = 
  // TODO: put any specific application types of errors here; see users.ts
  '';

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