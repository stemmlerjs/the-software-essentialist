
import { Request } from "express";
import { CreateMemberInput } from "@dddforum/api/src/members";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { ServerErrors } from '@dddforum/errors/src'

export class CreateMemberCommand {

  constructor(public props: CreateMemberInput, ) {}

  static create (token: DecodedIdToken | undefined, body: Request['body']) {
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


