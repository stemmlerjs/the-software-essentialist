
import { randomUUID } from "crypto";
import { ValueObject } from "./valueObject";

type IdentifierState = string;

export class Identifier extends ValueObject<IdentifierState> {
  private constructor (state: IdentifierState) {
    super(state);
  }

  public static create (input: string) {
    return new Identifier(input);
  }

  public static generateUUID() {
    return randomUUID();
  }
}