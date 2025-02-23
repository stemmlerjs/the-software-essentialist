import { VoteType } from "@dddforum/shared/src/api/posts";
import { AggregateRoot } from "@dddforum/shared/src/core/aggregateRoot";
import { ValidationError } from "@dddforum/shared/src/errors";
import { randomUUID } from "crypto";
import { CommentUpvoted } from "./commentUpvoted";
import { CommentDownvoted } from "./commentDownvoted";

type VoteState = 'Upvoted' | 'Downvoted' | 'Default';

interface CommentVoteProps {
  id: string;
  memberId: string;
  commentId: string;
  voteState: VoteState;
}

export class CommentVote extends AggregateRoot {
  private props: CommentVoteProps;

  private constructor(props: CommentVoteProps) {
    super();
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get memberId(): string {
    return this.props.memberId;
  }

  get commentId(): string {
    return this.props.commentId;
  }

  get voteState(): VoteState {
    return this.props.voteState;
  }

  getValue (): number {
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
    this.domainEvents.push(new CommentUpvoted(this.id, this.props.memberId));
  }

  private downvote() {
    if (this.props.voteState === 'Downvoted') {
      return;
    }
    this.props.voteState = 'Downvoted';
    this.domainEvents.push(new CommentDownvoted(this.id, this.props.memberId));
  }

  public static toDomain(props: CommentVoteProps): CommentVote {
    return new CommentVote(props);
  }

  public static create (memberId: string, commentId: string) : CommentVote | ValidationError {

    return new CommentVote({
      id: randomUUID(),
      memberId: memberId,
      commentId: commentId,
      voteState: 'Default'
    });
  }

  public static createUpvote(memberId: string, commentId: string): CommentVote | ValidationError {
    return new CommentVote({
      id: randomUUID(),
      memberId: memberId,
      commentId: commentId,
      voteState: 'Upvoted'
    });
  }

  public static createDownvote(memberId: string, commentId: string): CommentVote | ValidationError {
    return new CommentVote({
      id: randomUUID(),
      memberId: memberId,
      commentId: commentId,
      voteState: 'Downvoted'
    });
  }
}
