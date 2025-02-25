import { NotFoundError } from "@dddforum/shared/src/errors";
import { User } from "../../domain/user";
import { IdentityServiceAPI } from "../ports/identityServiceAPI";

export class Auth0 implements IdentityServiceAPI {
  getUserById(userId: string): Promise<User | NotFoundError> {
    throw new Error("Method not implemented.");
  }
  findUserByEmail(email: string): Promise<User | NotFoundError> {
    throw new Error("Method not implemented.");
  }
  
}