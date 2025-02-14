
import { Member } from "../../../members/domain/member";

export class CanCreatePostPolicy {

  public static isAllowed(member: Member): boolean {
    // if member reputation is not level 2, then the answer is no
    if (member.reputationScore < Member.REPUTATION_SCORES.Level2) {
      return false;
    }
    // if member reputation is level 2, then yes
    return true;
  }
}
