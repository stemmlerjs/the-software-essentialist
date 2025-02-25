
import { Request } from "express";
import {
  MissingRequestParamsException,
} from "../../shared/exceptions";
import { CreateMemberInput } from "@dddforum/shared/src/api/members";

export class CreateMemberCommand {

  constructor(public props: CreateMemberInput) {}

  static fromRequest(body: Request['body']) {
    const { userId, username, email, allowMarketingEmails } = body;

    if (!username) {
      throw new MissingRequestParamsException(["username"]);
    }

    if (!userId) {
      throw new MissingRequestParamsException(["userId"]);
    }


    if (!email) {
      throw new MissingRequestParamsException(["email"]);
    }

    return new CreateMemberCommand({ ...body });
  }
}


