import { PrismaClient } from "@prisma/client";
import { ProductionMembersRepository } from "../../../../members/repos/adapters/productionMembersRepository";
import { VoteOnPost } from "./voteOnPost";
import { ProductionPostsRepository } from "../../../../posts/repos/adapters/productionPostsRepository";
import { ProductionVotesRepository } from "../../../repos/adapters/productionVotesRepo";
import { EventsTable } from "../../../../../shared/events/ports/eventTable";
import { VoteOnPostCommand } from "../../../votesCommands";
import { PostVote } from "../../../../posts/domain/postVote";
import { Member, MemberReputationLevel } from "../../../../members/domain/member";
import { Post } from "../../../../posts/domain/post";
import { randomUUID } from "crypto";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";

describe('voteOnPost', () => {

  const prisma = new PrismaClient();
  const eventsTable = new EventsTable(prisma);
  const memberRepository = new ProductionMembersRepository(prisma);
  const postRepository = new ProductionPostsRepository(prisma);
  const voteRepository = new ProductionVotesRepository(prisma, eventsTable);
  const useCase = new VoteOnPost(memberRepository, postRepository, voteRepository);

  async function setupTest () {
    const originalPostOwner = Member.toDomain({
      id: randomUUID(),
      userId: randomUUID(),
      username: `billybob-${TextUtil.createRandomText(5)}`,
      reputationScore: 25,
      reputationLevel: MemberReputationLevel.Level2,
      dateCreated: new Date(),
      lastUpdated: new Date()
    })

    const member = Member.toDomain({
      id: randomUUID(),
      userId: randomUUID(),
      username: `jill-${TextUtil.createRandomText(5)}`,
      reputationScore: 21,
      reputationLevel: MemberReputationLevel.Level2,
      dateCreated: new Date(),
      lastUpdated: new Date()
    })

    const post = Post.toDomain({
      id: randomUUID(),
      title: 'test',
      content: 'This is a post that we are using for testing! Posted by billybob',
      memberId: originalPostOwner.id,
      dateCreated: new Date(),
      lastUpdated: new Date(),
      voteScore: 10,
      postType: 'text', // or the appropriate post type
      link: null // or the appropriate link value
    });


    await memberRepository.save(originalPostOwner);
    await memberRepository.save(member);
    await postRepository.save(post)

    return { member, post };
  }

  it('should be able to cast an upvote', async () => {
    const { member, post } = await setupTest()

    const command = new VoteOnPostCommand({ memberId: member.id, postId: post.id, voteType: 'upvote' });
    const response = await useCase.execute(command);

    // Post use case response
    expect(response).toBeInstanceOf(PostVote);
    expect((response as PostVote).memberId).toBe(member.id);
    expect((response as PostVote).postId).toBe(post.id);

    // Domain event saved
    const aggregateId = (response as PostVote).id;
    const eventsFromTable = await eventsTable.getEventsByAggregateId(aggregateId);
    expect(eventsFromTable.length).toBe(1);
    expect(eventsFromTable[0].name).toBe('PostUpvoted');
    expect(eventsFromTable[0].aggregateId).toBe(aggregateId);
    expect(eventsFromTable[0].data.postVoteId).toBe(aggregateId);
    expect(eventsFromTable[0].data.postId).toBe(post.id);
    expect(eventsFromTable[0].data.memberId).toBe(member.id);
  });

  it('should be able to cast an downvote', async () => {
    const { member, post } = await setupTest()

    const command = new VoteOnPostCommand({ memberId: member.id, postId: post.id, voteType: 'downvote' });
    const response = await useCase.execute(command);

    // Post use case response
    expect(response).toBeInstanceOf(PostVote);
    expect((response as PostVote).memberId).toBe(member.id);
    expect((response as PostVote).postId).toBe(post.id);

    // Domain event saved
    const aggregateId = (response as PostVote).id;
    const eventsFromTable = await eventsTable.getEventsByAggregateId(aggregateId);
    expect(eventsFromTable.length).toBe(1);
    expect(eventsFromTable[0].name).toBe('PostDownvoted');
    expect(eventsFromTable[0].aggregateId).toBe(aggregateId);
    expect(eventsFromTable[0].data.postVoteId).toBe(aggregateId);
    expect(eventsFromTable[0].data.postId).toBe(post.id);
    expect(eventsFromTable[0].data.memberId).toBe(member.id);
  });
})
