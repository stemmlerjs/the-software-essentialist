import { VoteType } from "@dddforum/shared/src/api/posts";
import { AggregateRoot } from "@dddforum/shared/src/core/aggregateRoot";
import { ValidationError } from "@dddforum/shared/src/errors";
import { randomUUID } from "crypto";
import { PostUpvoted } from "./postUpvoted";
import { PostDownvoted } from "./postDownvoted";

interface PostVoteProps {
  id: string;
  memberId: string;
  postId: string;
  value: number;
}

interface PostVoteInput {
  memberId: string;
  postId: string;
  voteType: VoteType
}

export class PostVote extends AggregateRoot {
  private props: PostVoteProps;

  private constructor (props: PostVoteProps) {
    super();
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get memberId(): string {
    return this.props.memberId;
  }

  get postId(): string {
    return this.props.postId;
  }

  get value (): number {
    return this.props.value
  }

  castVote(voteType: VoteType) {
    if (voteType === 'upvote') {
      this.upvote();
    } else {
      this.downvote();
    }
  }

  private upvote() {
    if (this.props.value === 1) {
      return;
    }
    this.props.value++;
    this.domainEvents.push(new PostUpvoted(this.id, this.props.memberId));
  }

  private downvote() {
    if (this.props.value === -1) {
      return;
    }
    this.props.value--;
    this.domainEvents.push(new PostDownvoted(this.id, this.props.memberId));
  }

  public static toDomain(props: PostVoteProps): PostVote {
    return new PostVote(props);
  }

  public static create(input: PostVoteInput): PostVote | ValidationError {
    return new PostVote({
      id: randomUUID(),
      memberId: input.memberId,
      postId: input.postId,
      value: 0,
    });
  }
}
