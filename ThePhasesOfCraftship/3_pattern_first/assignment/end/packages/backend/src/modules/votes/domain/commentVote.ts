
import { ValidationError } from "@dddforum/shared/src/errors";
import { CommentUpvoted } from "../../comments/domain/commentUpvoted";
import { VoteType } from "@dddforum/shared/src/api/posts";
import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { CommentDownvoted } from "../../comments/domain/commentDownvoted";
import { randomUUID } from "crypto";

// Inputs find their way all the way to the types near the api often
interface CommentVoteInput {
  memberId: string;
  commentId: string;
  voteType: VoteType;
}

interface CommentVoteProps {
  id: string,
  memberId: string,
  commentId: string,
  createdAt: Date,
  value: number;
}

abstract class AggregateRoot {
  protected domainEvents: DomainEvent[] = [];
}

export class CommentVote extends AggregateRoot {
  private props: CommentVoteProps;

  get id () {
    return this.props.id;
  }

  get memberId () {
    return this.props.memberId;
  }

  private constructor(
    props: CommentVoteProps
  ) {
    super();
    this.props = props;
  }

  castVote (voteType: VoteType) {
    if (voteType === 'upvote') {
      this.upvote();
    } else {
      this.downvote();
    }
  }

  private upvote () {
    if (this.props.value === 1) {
      return;
    }
    this.props.value++;
    this.domainEvents.push(new CommentUpvoted(this.id, this.props.memberId));
  }

  private downvote () {
    if (this.props.value === -1) {
      return;
    }
    this.props.value--;
    this.domainEvents.push(new CommentDownvoted(this.id, this.props.memberId));
  }

  public static create (input: CommentVoteInput): CommentVote | ValidationError {
    // TODO: Validation checks on all domain models;

    return new CommentVote({
      id: randomUUID(),
      memberId: input.memberId,
      commentId: input.commentId,
      createdAt: new Date(),
      value: 0
    });
  }
}
