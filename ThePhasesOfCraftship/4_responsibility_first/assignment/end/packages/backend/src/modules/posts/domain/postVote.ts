import { VoteType } from "@dddforum/shared/src/api/posts";
import { AggregateRoot } from "@dddforum/shared/src/core/aggregateRoot";
import { ValidationError } from "@dddforum/shared/src/errors";
import { randomUUID } from "crypto";
import { PostUpvoted } from "./postUpvoted";
import { PostDownvoted } from "./postDownvoted";

export type VoteState = 'Upvoted' | 'Downvoted' | 'Default';

interface PostVoteProps {
  id: string;
  memberId: string;
  postId: string;
  voteState: VoteState;
}

export class PostVote extends AggregateRoot {
  private props: PostVoteProps;

  private constructor(props: PostVoteProps) {
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

  get voteState(): VoteState {
    return this.props.voteState;
  }

  getValue () {
    switch (this.props.voteState) {
      case 'Upvoted':
        return 1;
      case 'Downvoted':
        return -1;
      default:
        return 0;
    }
  }

  castVote(voteType: VoteType) {
    if (voteType === 'upvote') {
      this.upvote();
    } else {
      this.downvote();
    }
  }

  private upvote() {
    if (this.props.voteState === 'Upvoted') {
      return;
    }
    this.props.voteState = 'Upvoted';
    this.domainEvents.push(new PostUpvoted(this.id, this.props.memberId));
  }

  private downvote() {
    if (this.props.voteState === 'Downvoted') {
      return;
    }
    this.props.voteState = 'Downvoted';
    this.domainEvents.push(new PostDownvoted(this.id, this.props.memberId));
  }

  public static toDomain(props: PostVoteProps): PostVote {
    return new PostVote(props);
  }

  public static create (memberId: string, postId: string) : PostVote | ValidationError {
    return new PostVote({
      id: randomUUID(),
      memberId: memberId,
      postId: postId,
      voteState: 'Default'
    });
  }
}
