
import { PrismaClient } from "@prisma/client";
import { Member, MemberReputationLevel } from "../../../domain/member";
import { ProductionMembersRepository } from "../../../repos/adapters/productionMembersRepository";
import { UpdateMemberReputationScore } from "./updateMemberReputationScore";
import { InMemoryEventBus } from "../../../../../shared/eventBus/adapters/inMemoryEventBus";
import { UpdateMemberReputationScoreCommand } from "../../../memberCommands";
import { MemberCommentVotesRoundup } from "../../../../votes/domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../../../votes/domain/memberPostVotesRoundup";
import { MemberUsername } from "../../../domain/memberUsername";
import { ProductionVotesRepository } from "../../../../votes/repos/adapters/productionVotesRepo";

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

  let prisma = new PrismaClient();

  let membersRepo = new ProductionMembersRepository(prisma);
  let votesRepo = new ProductionVotesRepository(prisma);
  let eventBus = new InMemoryEventBus();

  const useCase = new UpdateMemberReputationScore(membersRepo, votesRepo, eventBus);

  describe('update with reputation level upgrade', () => {
    test(`
      given a level 1 member has an existing reputation score of 5,
      and they have posted two new comments each with an upvote and no downvotes,
      when we update the member reputation score
      then the member should have a reputation score of 7`, async () => {
  
      const { member } = setupTest(useCase, 5, { upvotes: 2, downvotes: 0 }, { upvotes: 0, downvotes: 0 });
  
      const saveSpy = jest.spyOn(useCase['memberRepository'], 'save').mockImplementation(async () => {});
  
      expect(member.reputationScore).toBe(5);
      expect(member.reputationLevel).toBe(MemberReputationLevel.Level1);
  
      const command = new UpdateMemberReputationScoreCommand({
        memberId: member.id,
      });
  
      let response = await useCase.execute(command);
  
      expect(response instanceof Member).toBe(true);
      expect((response as Member).reputationScore).toBe(7);
      expect((response as Member).reputationLevel).toBe(MemberReputationLevel.Level1);
      expect((response as Member).getDomainEvents().length).toBe(0);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with reputation level upgrade', () => {
    test(`
      given a level 1 member has an existing reputation score of 9,
      and they have posted two new comments each with an upvote and no downvotes,
      when we update the member reputation score
      then the member should have a reputation score of 11
      and the member should be upgraded to level 2`, async () => {
  
      const { member } = setupTest(useCase, 9, { upvotes: 2, downvotes: 0 }, { upvotes: 0, downvotes: 0 });
  
      const saveSpy = jest.spyOn(useCase['memberRepository'], 'save').mockImplementation(async () => {});
  
      expect(member.reputationScore).toBe(9);
      expect(member.reputationLevel).toBe(MemberReputationLevel.Level1);
  
      const command = new UpdateMemberReputationScoreCommand({
        memberId: member.id,
      });
  
      let response = await useCase.execute(command);
  
      expect(response instanceof Member).toBe(true);
      expect((response as Member).reputationScore).toBe(11);
      expect((response as Member).reputationLevel).toBe(MemberReputationLevel.Level2);
      expect((response as Member).getDomainEvents().length).toBe(1);
      expect((response as Member).getDomainEvents()[0].constructor.name).toBe('MemberReputationLevelUpgraded');
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

});
