import { ReadModel } from "@dddforum/core";

interface MemberPostVotesRoundupProps {
  memberId: string;
  allPostsCount: number;
  allPostsUpvoteCount: number;
  allPostsDownvoteCount: number;
}

export class MemberPostVotesRoundup extends ReadModel<MemberPostVotesRoundupProps> {
  private constructor (props: MemberPostVotesRoundupProps) {
    super(props);
  }

  get memberId () {
    return this.props.memberId;
  }

  getScore () {
    return this.props.allPostsUpvoteCount - this.props.allPostsDownvoteCount;
  }

  public static toDomain (props: MemberPostVotesRoundupProps): MemberPostVotesRoundup {
    return new MemberPostVotesRoundup(props);
  }
}
