import { PostDm, Vote } from "./postDm";

type PostViewModelProps = {
  title: string;
  dateCreated: string;
  memberPostedBy: any;
  numComments: number;
  voteScore: number;
};

// This got moved from the view into the presenter layer. Good.
function computeVoteCount(votes: Vote[]) {
  let count = 0;
  votes.forEach((v) => v.voteType === 'Upvote' ? count++ : count--);
  return count;
}

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

  public static fromDomain(post: PostDm): PostViewModel {

    return new PostViewModel({
      title: post.title,
      dateCreated: post.dateCreated,
      memberPostedBy: post.memberPostedBy,
      // this is something we could calculate based on the votes on the frontend, but there
      // is a better, more performant design that we can use to get this information from the backend
      voteScore: computeVoteCount(post.votes),
      // Same for this.
      numComments: post.comments.length
    });
  }
}
