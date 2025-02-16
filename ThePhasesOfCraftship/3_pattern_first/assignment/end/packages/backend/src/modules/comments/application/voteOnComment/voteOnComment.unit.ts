
import { PrismaClient } from "@prisma/client";
import { ProductionMembersRepository } from "../../../members/repos/adapters/productionMembersRepository";
import { VoteOnComment } from "./voteOnComment";
import { CommentNotFoundError, MemberNotFoundError } from "@dddforum/shared/src/errors";
import { VoteOnCommentCommand } from "../../../posts/postsCommands";
import { ProductionCommentsRepository } from "../../repos/adapters/productionCommentRepository";
import { ProductionVotesRepository } from "../../../votes/repos/adapters/productionVotesRepository";

let prisma = new PrismaClient();

let membersRepo = new ProductionMembersRepository(prisma);
let commentsRepo = new ProductionCommentsRepository(prisma);
let votesRepo = new ProductionVotesRepository(prisma);

const useCase = new VoteOnComment(membersRepo, commentsRepo, votesRepo);

describe('voteOnComment', () => {

  describe('permissions & identity', () => {
    test('if the member was not found, they should not be able to vote on the comment', async () => {

      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(null);
      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: 'non-existent-id',
        memberId: 'non-existent-id',
        voteType: 'upvote'
      });
      
      const response = await useCase.execute(command);
      
      expect(response instanceof MemberNotFoundError).toBe(true);
      expect((response as MemberNotFoundError).name).toEqual('MemberNotFoundError');
      expect(saveSpy).not.toHaveBeenCalled();
    });

    test('if the comment was not found, they should not be able to vote on the comment', async () => {

      useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(null);
      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue({});

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: 'non-existent-id',
        memberId: 'non-existent-id',
        voteType: 'upvote'
      });
      
      const response = await useCase.execute(command);
      
      expect(response instanceof CommentNotFoundError).toBe(true);
      expect((response as CommentNotFoundError).name).toEqual('CommentNotFoundError');
      expect(saveSpy).not.toHaveBeenCalled();
    });

    it.each([
      ['level 1'],
      ['level 2']
    ])('as a %s member, I can cast a vote on a comment', (level) => {
      
    });
  });

  describe ('vote state', () => {
    test('as a level 1 member, when I upvote a comment I have not yet upvoted, the comment should be upvoted', () => {});
    test('as a level 1 member, when I downvote a comment I have not yet downvoted, the comment should be downvoted', () => {});
    test('as a level 1 member, when I upvote a comment I have already upvoted, the comment should be unvoted', () => {});
    test('as a level 1 member, when I downvote a comment I have already downvoted, the comment should be unvoted', () => {});
  })

  describe ('many existing comments vote score', () => {

    test('upvote existing: as a level 1 member, when I upvote a comment with existing votes that I have not yet upvoted, the comment score should get incremented', () => {
      const previousVotes = [
        ['fd2b8704-e44f-434a-afcd-6aea4103f51d', 'upvote'],
        ['d74cd0f9-1afa-4a67-9d7c-6c38639ce362', 'upvote'],
        ['65551634-6071-490a-98b8-176eb75ecca3', 'upvote'],
        ['9f4b72a8-45bc-4436-b537-74e19da2fd19', 'downvote']
      ];
  
      let memberId = '90a2c5d3-7e56-4aec-9500-8f68a5e3fbc1';
    });

    test('upvote existing: as a level 1 member, when I downvote a comment with existing votes that I have not yet upvoted, the comment score should get incremented', () => {
      const previousVotes = [
        ['fd2b8704-e44f-434a-afcd-6aea4103f51d', 'upvote'],
        ['d74cd0f9-1afa-4a67-9d7c-6c38639ce362', 'upvote'],
        ['65551634-6071-490a-98b8-176eb75ecca3', 'upvote'],
        ['9f4b72a8-45bc-4436-b537-74e19da2fd19', 'downvote']
      ];
  
      let memberId = '90a2c5d3-7e56-4aec-9500-8f68a5e3fbc1';
    });

  });
  
})
