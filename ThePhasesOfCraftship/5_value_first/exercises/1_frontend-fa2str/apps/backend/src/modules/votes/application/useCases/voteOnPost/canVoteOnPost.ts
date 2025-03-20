import { Member, MemberReputationLevel } from "../../../../members/domain/member";
import { Types } from '@dddforum/api/members'

export class CanVoteOnPostPolicy {
  public static isAllowed(member: Member): boolean {
    if (
      member.reputationLevel === Types.ReputationLevel.Level1 ||
      member.reputationLevel === Types.ReputationLevel.Level2
    ) {
      return true;
    }

    return false;
  }
}
