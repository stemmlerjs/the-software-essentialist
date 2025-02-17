
import { PrismaClient } from "@prisma/client";
import { ProductionMembersRepository } from "../../../../members/repos/adapters/productionMembersRepository";
import { VoteOnComment } from "./voteOnComment";
import { CommentNotFoundError, MemberNotFoundError } from "@dddforum/shared/src/errors";
import { VoteOnCommentCommand } from "../../../../posts/postsCommands";
import { ProductionCommentsRepository } from "../../../repos/adapters/productionCommentRepository";
import { ProductionVotesRepository } from "../../../repos/adapters/productionVoteRepository";
import { Member, MemberReputationLevel } from "../../../../members/domain/member";
import { Comment } from "../../../domain/comment";
import { CommentVote } from "../../../domain/commentVote";
import { InMemoryEventBus } from "../../../../../shared/eventBus/adapters/inMemoryEventBus";
import { MemberUsername } from "../../../../members/domain/memberUsername";
import { VoteState } from "../../../../posts/domain/postVote";

let prisma = new PrismaClient();

let membersRepo = new ProductionMembersRepository(prisma);
let commentsRepo = new ProductionCommentsRepository(prisma);
let votesRepo = new ProductionVotesRepository(prisma);
let eventBus = new InMemoryEventBus();

const useCase = new VoteOnComment(membersRepo, commentsRepo, votesRepo, eventBus);

function setupCommentAndMember (useCase: VoteOnComment, memberReputationLevel: MemberReputationLevel) {
  jest.resetAllMocks();

  let member = Member.toDomain({
    userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
    username: MemberUsername.toDomain('jill'),
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

function setupCommentVote (member: Member, comment: Comment, state: VoteState) {
  let commentVote = CommentVote.toDomain({
    id: '6f2a5a6e-7f0f-4f3d-8c8b-9c0c6e2c2f8e',
    commentId: comment.id,
    memberId: member.id,
    voteState: state
  });

  useCase['voteRepository'].findVoteByMemberIdAndCommentId = jest.fn().mockResolvedValue(commentVote);
}

describe('voteOnComment', () => {

  describe('permissions & identity', () => {
    test('if the member was not found, they should not be able to vote on the comment', async () => {

      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(null);
      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: 'non-existent-id',
        memberId: 'non-existent-id',
        voteType: 'upvote'
      });
      
      const response = await useCase.execute(command);
      
      expect(response instanceof MemberNotFoundError).toBe(true);
      expect((response as MemberNotFoundError).name).toEqual('MemberNotFoundError');
      expect(saveSpy).not.toHaveBeenCalled();
      expect(eventBusSpy).not.toHaveBeenCalled();
    });

    test('if the comment was not found, they should not be able to vote on the comment', async () => {

      useCase['commentRepository'].getCommentById = jest.fn().mockResolvedValue(null);
      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue({});

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: 'non-existent-id',
        memberId: 'non-existent-id',
        voteType: 'upvote'
      });
      
      const response = await useCase.execute(command);
      
      expect(response instanceof CommentNotFoundError).toBe(true);
      expect((response as CommentNotFoundError).name).toEqual('CommentNotFoundError');
      expect(saveSpy).not.toHaveBeenCalled();
      expect(eventBusSpy).not.toHaveBeenCalled();
    });

    it.each([
      [MemberReputationLevel.Level1],
      [MemberReputationLevel.Level2]
    ])('as a %s member, I can cast a vote on a comment', async (reputationLevel) => {
      const { member } = setupCommentAndMember(useCase, reputationLevel);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: 'existing-comment-id',
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect((response as CommentVote).getValue()).toEqual(1);
      expect((response as CommentVote).getDomainEvents()).toHaveLength(1);
      expect((response as CommentVote).getDomainEvents()[0].name).toEqual('CommentUpvoted');
      expect(eventBusSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ name: 'CommentUpvoted' })
      ]));
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe ('vote state', () => {
    test('as a level 1 member, when I upvote a comment I have not yet upvoted, the comment should be upvoted and an upvoted event should get dispatched', async () => {
      const {member, comment} = setupCommentAndMember(useCase, MemberReputationLevel.Level1);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect((response as CommentVote).getValue()).toEqual(1);
      expect((response as CommentVote).getDomainEvents()).toHaveLength(1);
      expect((response as CommentVote).getDomainEvents()[0].name).toEqual('CommentUpvoted');
      expect(saveSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ name: 'CommentUpvoted' })
      ]));
    });

    test('as a level 1 member, when I downvote a comment I have not yet downvoted, the comment should be downvoted and a downvoted event should get dispatched', async () => {
      const {member, comment} = setupCommentAndMember(useCase, MemberReputationLevel.Level1);
      setupCommentVote(member, comment, 'Default');

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'downvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect((response as CommentVote).getValue()).toEqual(-1);
      expect((response as CommentVote).getDomainEvents()).toHaveLength(1);
      expect((response as CommentVote).getDomainEvents()[0].name).toEqual('CommentDownvoted');
      expect(saveSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ name: 'CommentDownvoted' })
      ]));
    });

    test('as a level 1 member, when I upvote a comment I have already upvoted, the comment should remain upvoted and no upvoted event should get dispatched', async () => {
      const {member, comment} = setupCommentAndMember(useCase, MemberReputationLevel.Level1);
      setupCommentVote(member, comment, 'Upvoted');

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect((response as CommentVote).getValue()).toEqual(1);
      expect((response as CommentVote).getDomainEvents()).toHaveLength(0);
      expect(saveSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalledWith([]);
    });

    test('as a level 1 member, when I downvote a comment I have already downvoted, the comment should remain downvoted', async () => {
      const {member, comment} = setupCommentAndMember(useCase, MemberReputationLevel.Level1);
      setupCommentVote(member, comment, 'Downvoted');

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'downvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect((response as CommentVote).getValue()).toEqual(-1);
      expect(saveSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalledWith([]);
    });
  });

  describe ('many existing comments vote score', () => {

    test('upvote existing: as a level 1 member, when I upvote a comment with existing votes that I have not yet upvoted, the comment score should get incremented', async () => {
      const {member, comment} = setupCommentAndMember(useCase, MemberReputationLevel.Level1);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'upvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(response instanceof CommentVote).toBeTruthy();
      expect(saveSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ name: 'CommentUpvoted' })
      ]));
    });

    test('downvote existing: as a level 1 member, when I downvote a comment with existing votes that I have not yet downvoted, the comment score should get decremented', async () => {
      const {member, comment } = setupCommentAndMember(useCase, MemberReputationLevel.Level1);

      const saveSpy = jest.spyOn(useCase['voteRepository'], 'save');
      const eventBusSpy = jest.spyOn(useCase['eventBus'], 'publishEvents');

      const command = new VoteOnCommentCommand({
        commentId: comment.id,
        memberId: member.id,
        voteType: 'downvote'
      });

      const response = await useCase.execute(command);

      expect(response).toBeDefined();
      expect(saveSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalled();
      expect(eventBusSpy).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ name: 'CommentDownvoted' })
      ]));
    });

  });
  
})
