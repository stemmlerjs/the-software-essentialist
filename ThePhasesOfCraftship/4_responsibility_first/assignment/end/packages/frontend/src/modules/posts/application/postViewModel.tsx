import { UserDm } from "../../users/domain/userDm";
import { PostDm } from "../domain/postDm";

type PostViewModelProps = {
  title: string;
  dateCreated: string;
  numComments: number;
  voteScore: number;
  canCastVote: boolean;
  memberUserName: string;
};

export class PostViewModel {
  private readonly props: PostViewModelProps;

  constructor(props: PostViewModelProps) {
    this.props = props;
  }

  get title() {
    return this.props.title;
  }

  get dateCreated() {
    return this.props.dateCreated;
  }

  get numComments() {
    return this.props.numComments;
  }

  get voteScore() {
    return this.props.voteScore;
  }

  get canCastVote () {
    return this.props.canCastVote
  }

  get memberUserName () {
    return this.props.memberUserName
  }

  public static fromDomain(post: PostDm, currentUser: UserDm | null): PostViewModel {

    return new PostViewModel({
      title: post.title,
      dateCreated: post.dateCreated,
      // this is something we could calculate based on the votes on the frontend, but there
      // is a better, more performant design that we can use to get this information from the backend
      voteScore: post.voteScore,
      // Same for this.
      numComments: post.comments.length,
      canCastVote: currentUser ? currentUser.canVote() : false,
      memberUserName: post.member.username
    });
  }
}
