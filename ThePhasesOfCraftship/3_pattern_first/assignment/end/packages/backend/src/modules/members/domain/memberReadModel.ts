
import { Member } from "@prisma/client";

export class MemberReadModel {
  public static fromPrisma (member: Member) {
    return new MemberReadModel();
  }
}
