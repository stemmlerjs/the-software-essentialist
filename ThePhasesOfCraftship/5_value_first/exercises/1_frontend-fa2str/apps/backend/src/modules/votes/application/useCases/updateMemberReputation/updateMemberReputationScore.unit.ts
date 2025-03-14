import { PrismaClient } from "@prisma/client";
import { UpdateMemberReputationScore } from "./updateMemberReputationScore";
import { MemberCommentVotesRoundup } from "../../../../votes/domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../../../votes/domain/memberPostVotesRoundup";
import { ProductionVotesRepository } from "../../../../votes/repos/adapters/productionVotesRepo";
import { MemberUsername } from "../../../../members/domain/memberUsername";
import { Member, MemberReputationLevel } from "../../../../members/domain/member";
import { ProductionMembersRepository } from "../../../../members/repos/adapters/productionMembersRepository";
import { EventOutboxTable } from "@dddforum/outbox";
import { Commands  } from "@dddforum/api/votes";
import { PrismaDatabase } from "@dddforum/database";
import { Config } from "@dddforum/config";

function setupTest(useCase: UpdateMemberReputationScore, initialReputationScore: number, commentVotes: { upvotes: number, downvotes: number }, postVotes: { upvotes: number, downvotes: number }) {
  jest.resetAllMocks();

  let member = Member.toDomain({
    userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
    username: MemberUsername.toDomain('jill'),
    reputationScore: initialReputationScore,
    reputationLevel: initialReputationScore >= 10 ? MemberReputationLevel.Level2 : MemberReputationLevel.Level1,
    id: 'bf6b4773-feea-44cd-a951-f0ffd68625ea'
  });

  let commentVotesRoundup = MemberCommentVotesRoundup.toDomain({
    allCommentsCount: commentVotes.upvotes + commentVotes.downvotes,
    allCommentsUpvoteCount: commentVotes.upvotes,
    allCommentsDownvoteCount: commentVotes.downvotes,
    memberId: member.id
  });

  let postVotesRoundup = MemberPostVotesRoundup.toDomain({
    allPostsCount: postVotes.upvotes + postVotes.downvotes,
    allPostsDownvoteCount: postVotes.downvotes,
    allPostsUpvoteCount: postVotes.upvotes,
    memberId: member.id
  });

  useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(member);
  useCase['votesRepository'].getMemberPostVotesRoundup = jest.fn().mockResolvedValue(postVotesRoundup);
  useCase['votesRepository'].getMemberCommentVotesRoundup = jest.fn().mockResolvedValue(commentVotesRoundup);

  return { member, commentVotesRoundup, postVotesRoundup }
}

describe('updateMemberReputationScore', () => {

  let config = Config();
  let database = new PrismaDatabase(config);
  let eventsTable = new EventOutboxTable(database);
  let membersRepo = new ProductionMembersRepository(database, eventsTable);
  let votesRepo = new ProductionVotesRepository(database, eventsTable);

  const useCase = new UpdateMemberReputationScore(membersRepo, votesRepo);

  describe('reputation score', () => {
    test(`
      given a level 1 member exists,
      and they have posted two new comments each with an upvote and no downvotes,
      when we update the member reputation score
      then the member should have a reputation score of 2`, async () => {
  
      const { member } = setupTest(useCase, 0, { upvotes: 2, downvotes: 0 }, { upvotes: 0, downvotes: 0 });
  
      const saveSpy = jest.spyOn(useCase['memberRepository'], 'saveAggregateAndEvents')
        .mockImplementation(async () => {});
  
      const command = new Commands.UpdateMemberReputationScoreCommand({
        memberId: member.id,
      });
  
      const result = await useCase.execute(command);
  
      expect(result.isSuccess()).toBe(true);
      if (result.isSuccess()) {
        const updatedMember = result.getValue();
        expect(updatedMember.reputationScore).toBe(2);
        expect(updatedMember.reputationLevel).toBe(MemberReputationLevel.Level1);
        expect(updatedMember.getDomainEvents().length).toBe(0);
      }
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with reputation level upgrade', () => {
    test.only(`
      given a level 1 member has an existing reputation score of 0,
      and they have posted 7 new comments each with an upvote and no downvotes,
      when we update the member reputation score
      then the member should have a reputation score of 7
      and the member should be upgraded to level 2`, async () => {
  
      const { member } = setupTest(useCase, 0, { upvotes: 7, downvotes: 0 }, { upvotes: 0, downvotes: 0 });
  
      const saveSpy = jest.spyOn(useCase['memberRepository'], 'saveAggregateAndEvents')
        .mockImplementation(async () => {});
  
      const command = new Commands.UpdateMemberReputationScoreCommand({
        memberId: member.id,
      });
  
      const result = await useCase.execute(command);
  
      expect(result.isSuccess()).toBe(true);
      if (result.isSuccess()) {
        const updatedMember = result.getValue();
        expect(updatedMember.reputationScore).toBe(7);
        expect(updatedMember.reputationLevel).toBe(MemberReputationLevel.Level2);
        expect(updatedMember.getDomainEvents().length).toBe(1);
        expect(updatedMember.getDomainEvents()[0].constructor.name).toBe('MemberReputationLevelUpgraded');
      }
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

});
