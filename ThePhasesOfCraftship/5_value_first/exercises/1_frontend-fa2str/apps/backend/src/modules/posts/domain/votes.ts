
import { Collection } from '@dddforum/core';

interface VoteProps {
  voteStatus: 'Upvote' | 'Downvote' | 'None';
  memberId: string;
  postId: string;
}

export class Vote {
  constructor (private props: VoteProps) {

  }

  get memberId () {
    return this.props.memberId;
  }

  isUpvote () {
    return this.props.voteStatus === 'Upvote';
  }

  public static create (props: VoteProps) {
    return new Vote(props);
  }
}

export class Votes extends Collection<Vote> {

  private constructor(votes: Vote[]) {
    super(votes);
  }

  getFirst(): Vote {
    return this.first();
  }

  addUpvote (memberId: string, postId: string) {
    this.add(Vote.create({ voteStatus: 'Upvote', memberId, postId }));
  }

  public static create () {
    return new Votes([]);
  }
}
