import { Member, MemberReputationLevel } from "@dddforum/backend/src/modules/members/domain/member";
import { MemberUsername } from "@dddforum/backend/src/modules/members/domain/memberUsername";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { randomUUID } from "crypto";

export async function setupMember(fixture: DatabaseFixture, reputationLevel: MemberReputationLevel = MemberReputationLevel.Level1, score: number = 6) {
  const member = Member.toDomain({
    id: randomUUID(),
    userId: randomUUID(),
    username: MemberUsername.toDomain(`khalilstemmler-${TextUtil.createRandomText(5)}`),
    reputationLevel: reputationLevel,
    reputationScore: score,
  });
  await fixture.setupWithExistingMembers([member]);
  return { member };
}
