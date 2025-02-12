import { UserDm } from "../../users/domain/userDm";
import { PostDm, Vote } from "../domain/postDm";

type PostViewModelProps = {
  title: string;
  dateCreated: string;
  memberPostedBy: any;
  numComments: number;
  voteScore: number;
  canCastVote: boolean;
};

export class PostViewModel {
  private props: PostViewModelProps;

  constructor(props: PostViewModelProps) {
    this.props = props;
  }

  get title() {
    return this.props.title;
  }

  get dateCreated() {
    return this.props.dateCreated;
  }

  get memberPostedBy() {
    return this.props.memberPostedBy;
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

  public static fromDomain(post: PostDm, currentUser: UserDm): PostViewModel {

    return new PostViewModel({
      title: post.title,
      dateCreated: post.dateCreated,
      memberPostedBy: post.memberPostedBy,
      // this is something we could calculate based on the votes on the frontend, but there
      // is a better, more performant design that we can use to get this information from the backend
      voteScore: post.voteScore,
      // Same for this.
      numComments: post.comments.length,
      canCastVote: currentUser.canVote()
    });
  }
}
