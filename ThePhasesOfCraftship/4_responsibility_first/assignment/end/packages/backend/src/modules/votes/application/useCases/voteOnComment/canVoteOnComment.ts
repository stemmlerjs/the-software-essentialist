import { Member, MemberReputationLevel } from "../../../../members/domain/member";

export class CanVoteOnCommentPolicy {
  public static isAllowed(member: Member): boolean {
    if (
      member.reputationLevel === MemberReputationLevel.Level2
    ) {
      return true;
    }

    return false;
  }
}
