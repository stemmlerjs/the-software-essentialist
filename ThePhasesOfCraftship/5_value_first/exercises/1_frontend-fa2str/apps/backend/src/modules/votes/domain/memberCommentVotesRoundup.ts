
import { ReadModel } from "@dddforum/core";

interface MemberCommentVotesRoundupProps {
  memberId: string;
  allCommentsCount: number;
  allCommentsUpvoteCount: number;
  allCommentsDownvoteCount: number;
}

export class MemberCommentVotesRoundup extends ReadModel<MemberCommentVotesRoundupProps> {
  private constructor (props: MemberCommentVotesRoundupProps) {
    super(props);
  }

  get memberId () {
    return this.props.memberId;
  }
  
  getScore () {
    return this.props.allCommentsUpvoteCount - this.props.allCommentsDownvoteCount;
  }

  public static toDomain (props: MemberCommentVotesRoundupProps): MemberCommentVotesRoundup {
    return new MemberCommentVotesRoundup(props);
  }
}
