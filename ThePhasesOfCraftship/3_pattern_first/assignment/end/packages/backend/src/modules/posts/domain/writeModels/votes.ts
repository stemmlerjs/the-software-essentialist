
import { Collection } from '@dddforum/shared/src/core/collection';

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

  public static create () {
    return new Votes([]);
  }
}
