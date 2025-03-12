
import { AggregateRoot } from "@dddforum/core";
import { randomUUID } from "crypto";
import { CommentUpvoted } from "./commentUpvoted";
import { CommentDownvoted } from "./commentDownvoted";
import { Types } from "@dddforum/api/votes";
import { ApplicationErrors } from "@dddforum/errors";

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

  castVote(voteType: Types.VoteType) {
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
    const commentUpvote = CommentUpvoted.create({ commentId: this.commentId, memberId: this.memberId });
    this.domainEvents.push(commentUpvote);
  }

  private downvote() {
    if (this.props.voteState === 'Downvoted') {
      return;
    }
    this.props.voteState = 'Downvoted';
    const commentDownvote = CommentDownvoted.create({ commentId: this.commentId, memberId: this.memberId });
    this.domainEvents.push(commentDownvote);
  }

  public static toDomain(props: CommentVoteProps): CommentVote {
    return new CommentVote(props);
  }

  public static create (memberId: string, commentId: string) : CommentVote | ApplicationErrors.ValidationError {

    return new CommentVote({
      id: randomUUID(),
      memberId: memberId,
      commentId: commentId,
      voteState: 'Default'
    });
  }

  public static createUpvote(memberId: string, commentId: string): CommentVote | ApplicationErrors.ValidationError {
    return new CommentVote({
      id: randomUUID(),
      memberId: memberId,
      commentId: commentId,
      voteState: 'Upvoted'
    });
  }

  public static createDownvote(memberId: string, commentId: string): CommentVote | ApplicationErrors.ValidationError {
    return new CommentVote({
      id: randomUUID(),
      memberId: memberId,
      commentId: commentId,
      voteState: 'Downvoted'
    });
  }
}
