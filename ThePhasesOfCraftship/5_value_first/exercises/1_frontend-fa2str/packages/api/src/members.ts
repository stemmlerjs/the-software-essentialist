import axios, { AxiosError } from "axios";
import { APIResponse, getAuthHeaders } from ".";
import { Request, Result } from "@dddforum/core";
import { ServerErrors } from '@dddforum/errors/server'
import { Types as UserTypes } from './users'
import { ApplicationErrors } from "@dddforum/errors/application";

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
    private constructor(public props: Inputs.CreateMemberInput) {}
  
    static create(
      token: UserTypes.DecodedIdToken | undefined, 
      body: Request['body']
    ): Result<CreateMemberCommand, ServerErrors.MissingRequestParamsError> {
      if (!token?.email) {
        return Result.failure(new ServerErrors.MissingRequestParamsError(["email"]));
      }
  
      if (!token?.uid) {
        return Result.failure(new ServerErrors.MissingRequestParamsError(["userId"]));
      }
  
      if (!body.username) {
        return Result.failure(new ServerErrors.MissingRequestParamsError(["username"]));
      }
  
      return Result.success(new CreateMemberCommand({
        userId: token.uid,
        username: body.username,
        email: token.email as string
      }));
    }

    static fromRequest(
      user: UserTypes.DecodedIdToken | undefined,
      body: Request['body']
    ): Result<CreateMemberCommand, ServerErrors.MissingRequestParamsError> {
      return this.create(user, body);
    }
  }
}

export namespace Errors {

  export type CreateMemberError = '';

  export type AnyMemberError = 
    CreateMemberError |
    ApplicationErrors.AnyApplicationError |
    ServerErrors.AnyServerError
}

export namespace API {
  export type CreateMemberAPIResponse = APIResponse<DTOs.MemberDTO, Errors.CreateMemberError>;
  export type AnyMemberAPIResponse = CreateMemberAPIResponse;
}

export const createMembersAPI = (apiURL: string) => {
  return {
    create: async (input: Inputs.CreateMemberInput, authToken: string) => {
      try {
        const successResponse = await axios.post(
          `${apiURL}/members/new`, 
          input, 
          getAuthHeaders(authToken)
        );
        return successResponse.data as API.CreateMemberAPIResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as API.CreateMemberAPIResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as API.CreateMemberAPIResponse;
      }
    }
  }
}