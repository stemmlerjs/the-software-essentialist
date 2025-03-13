
import { AggregateRoot } from "@dddforum/core";
import { ApplicationErrors } from "@dddforum/errors/application";
import { randomUUID } from "crypto";
import { PostUpvoted } from "./postUpvoted";
import { PostDownvoted } from "./postDownvoted";
import { DTOs, Types } from "@dddforum/api/votes";

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
    const domainEvent = PostUpvoted.create({
      memberId: this.props.memberId,
      postId: this.props.postId,
      postVoteId: this.id
    });
    this.props.voteState = 'Upvoted';
    this.domainEvents.push(domainEvent);
  }

  private downvote() {
    if (this.props.voteState === 'Downvoted') {
      return;
    }
    const domainEvent = PostDownvoted.create({
      memberId: this.props.memberId,
      postId: this.props.postId,
      postVoteId: this.id
    });
    this.props.voteState = 'Downvoted';
    this.domainEvents.push(domainEvent);
  }

  public static toDomain(props: PostVoteProps): PostVote {
    return new PostVote(props);
  }

  public static create (memberId: string, postId: string) : PostVote | ApplicationErrors.ValidationError {
    return new PostVote({
      id: randomUUID(),
      memberId: memberId,
      postId: postId,
      voteState: 'Default'
    });
  }

  public toDTO (): DTOs.PostVoteDTO {
    return {
      memberId: this.props.memberId,
      postId: this.props.postId,
      voteType: this.props.voteState === 'Upvoted' ? 'upvote' : 'downvote'
    }
  }
}
