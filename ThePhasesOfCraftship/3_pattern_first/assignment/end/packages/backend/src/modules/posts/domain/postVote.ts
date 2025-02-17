import { VoteType } from "@dddforum/shared/src/api/posts";
import { AggregateRoot } from "@dddforum/shared/src/core/aggregateRoot";
import { randomUUID } from "crypto";

interface PostVoteProps {
  id: string;
  memberId: string;
  postId: string;
  voteType: VoteType
}

interface PostVoteInput {
  memberId: string;
  postId: string;
  voteType: VoteType
}

export class PostVote extends AggregateRoot {

  private constructor (props: PostVoteProps) {
    super()
  }

  public static create (input: PostVoteInput) {
    return new PostVote({
      ...input,
      id: randomUUID(),
    });
  }

}
