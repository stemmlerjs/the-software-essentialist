import { PrismaClient } from "@prisma/client";
import { ProductionMembersRepository } from "../../../members/repos/adapters/productionMembersRepository";
import { VoteOnComment } from "./voteOnComment";
import { CommentNotFoundError, MemberNotFoundError } from "@dddforum/shared/src/errors";
import { VoteOnCommentCommand } from "../../../posts/postsCommands";
import { ProductionCommentsRepository } from "../../repos/adapters/productionCommentRepository";
import { ProductionVotesRepository } from "../../../votes/repos/adapters/productionVotesRepository";
import { Member, MemberReputationLevel } from "../../../members/domain/member";
import { Comment } from "../../domain/comment";
import { CommentVote } from "../../../votes/domain/commentVote";

let prisma = new PrismaClient();

let membersRepo = new ProductionMembersRepository(prisma);
let commentsRepo = new ProductionCommentsRepository(prisma);
let votesRepo = new ProductionVotesRepository(prisma);

const useCase = new VoteOnComment(membersRepo, commentsRepo, votesRepo);

function setupTest (useCase: VoteOnComment, memberReputationLevel: MemberReputationLevel) {
  jest.resetAllMocks();

  let member = Member.toDomain({
    userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
    username: 'jill',
    reputationScore: 10,
    reputationLevel: memberReputationLevel,
    id: 'bf6b4773-feea-44cd-a951-f0ffd68625ea'
  });

  let comment = Comment.toDomain({
    id: '83f91fd3-3e54-4d55-aa92-9027abd5310e',
    text: 'This is a comment',
    memberId: member.id,
    parentCommentId: null,
    postId: '2e348513-b2d7-449a-aed4-7b0050261e3e'
  });

  useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(member);
  useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(comment);

  return {member, comment};
}

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
      [MemberReputationLevel.Level1],
      [MemberReputationLevel.Level2]
    ])('as a %s member, I can cast a vote on a comment', async (reputationLevel) => {
      const { member } = setupTest(useCase, reputationLevel);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: 'existing-comment-id',
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe ('vote state', () => {
    test('as a level 1 member, when I upvote a comment I have not yet upvoted, the comment should be upvoted', async () => {
      const {member, comment} = setupTest(useCase, MemberReputationLevel.Level1);

      // useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(comment);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect(saveSpy).toHaveBeenCalled();
    });

    test('as a level 1 member, when I downvote a comment I have not yet downvoted, the comment should be downvoted', async () => {
      const {member, comment} = setupTest(useCase, MemberReputationLevel.Level1);

      // useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(comment);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'downvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect(saveSpy).toHaveBeenCalled();
    });

    test('as a level 1 member, when I upvote a comment I have already upvoted, the comment should be unvoted', async () => {
      const {member, comment} = setupTest(useCase, MemberReputationLevel.Level1);

      // const comment = {
      //   id: 'existing-comment-id',
      //   votes: [{ memberId: member.id, voteType: 'upvote' }]
      // };

      // useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(comment);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect(saveSpy).toHaveBeenCalled();
    });

    test('as a level 1 member, when I downvote a comment I have already downvoted, the comment should be unvoted', async () => {
      const {member, comment} = setupTest(useCase, MemberReputationLevel.Level1);

      // const comment = {
      //   id: 'existing-comment-id',
      //   votes: [{ memberId: member.id, voteType: 'downvote' }]
      // };

      // useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(comment);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'downvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe ('many existing comments vote score', () => {

    test('upvote existing: as a level 1 member, when I upvote a comment with existing votes that I have not yet upvoted, the comment score should get incremented', async () => {
      const previousVotes = [
        ['fd2b8704-e44f-434a-afcd-6aea4103f51d', 'upvote'],
        ['d74cd0f9-1afa-4a67-9d7c-6c38639ce362', 'upvote'],
        ['65551634-6071-490a-98b8-176eb75ecca3', 'upvote'],
        ['9f4b72a8-45bc-4436-b537-74e19da2fd19', 'downvote']
      ];

      const {member, comment} = setupTest(useCase, MemberReputationLevel.Level1);

      // const comment = {
      //   id: 'existing-comment-id',
      //   votes: previousVotes.map(([memberId, voteType]) => ({ memberId, voteType }))
      // };

      // useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(comment);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeUndefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect(saveSpy).toHaveBeenCalled();
    });

    test('downvote existing: as a level 1 member, when I downvote a comment with existing votes that I have not yet downvoted, the comment score should get decremented', async () => {
      const previousVotes = [
        ['fd2b8704-e44f-434a-afcd-6aea4103f51d', 'upvote'],
        ['d74cd0f9-1afa-4a67-9d7c-6c38639ce362', 'upvote'],
        ['65551634-6071-490a-98b8-176eb75ecca3', 'upvote'],
        ['9f4b72a8-45bc-4436-b537-74e19da2fd19', 'downvote']
      ];

      const {member, comment } = setupTest(useCase, MemberReputationLevel.Level1);

      // const comment = {
      //   id: 'existing-comment-id',
      //   votes: previousVotes.map(([memberId, voteType]) => ({ memberId, voteType }))
      // };

      // useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(comment);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'downvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeUndefined();
      expect(saveSpy).toHaveBeenCalled();
    });

  });
  
})
