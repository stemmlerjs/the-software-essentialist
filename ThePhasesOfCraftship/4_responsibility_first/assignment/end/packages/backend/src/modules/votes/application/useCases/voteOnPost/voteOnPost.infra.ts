import { PrismaClient } from "@prisma/client";
import { ProductionMembersRepository } from "../../../../members/repos/adapters/productionMembersRepository";
import { VoteOnPost } from "./voteOnPost";
import { ProductionPostsRepository } from "../../../../posts/repos/adapters/productionPostsRepository";
import { ProductionVotesRepository } from "../../../repos/adapters/productionVotesRepo";
import { EventsTable } from "../../../../../shared/events/ports/eventTable";
import { VoteOnPostCommand } from "../../../votesCommands";
import { PostVote } from "../../../../posts/domain/postVote";

describe('voteOnPost', () => {

  const prisma = new PrismaClient();
  const eventsTable = new EventsTable(prisma);
  const memberRepository = new ProductionMembersRepository(prisma);
  const postRepository = new ProductionPostsRepository(prisma);
  const voteRepository = new ProductionVotesRepository(prisma, eventsTable);
  const useCase = new VoteOnPost(memberRepository, postRepository, voteRepository);

  it.only('should be able to cast an upvote', async () => {
    const command = new VoteOnPostCommand({ memberId: '1', postId: '1', voteType: 'upvote' });

    const response = await useCase.execute(command);
    const aggregateId = (response as PostVote).id;

    expect(await eventsTable.getEventByAggregateId(aggregateId)).toBeDefined();
  });

  it('should be able to cast a downvote', () => {});
})
