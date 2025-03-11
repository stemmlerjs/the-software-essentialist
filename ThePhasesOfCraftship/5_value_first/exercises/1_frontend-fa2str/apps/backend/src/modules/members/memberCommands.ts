
import { Request } from "express";
import {
  MissingRequestParamsException,
} from "../../shared/exceptions";
import { CreateMemberInput } from "@dddforum/api/members";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export class CreateMemberCommand {

  constructor(public props: CreateMemberInput, ) {}

  static create (token: DecodedIdToken | undefined, body: Request['body']) {
    if (!token?.email) {
      throw new MissingRequestParamsException(["email"]);
    }

    if (!token?.uid) {
      throw new MissingRequestParamsException(["userId"]);
    }

    if (!body.username) {
      throw new MissingRequestParamsException(["username"]);
    }

    return new CreateMemberCommand({
      userId: token.uid,
      username: body.username,
      email: token.email as string
    });
  }
}


