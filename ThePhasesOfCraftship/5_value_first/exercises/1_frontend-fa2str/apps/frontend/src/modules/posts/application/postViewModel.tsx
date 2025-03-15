
import { UserDm } from "@/modules/members/domain/userDm";
import { PostDm } from "../domain/postDm";

export interface PostViewModelProps {
  title: string;
  content?: string;
  link?: string;
  dateCreated: string;
  memberUsername: string;
  voteScore: number;
  numComments: number;
}

export class PostViewModel {
  private readonly props: PostViewModelProps;

  constructor(props: PostViewModelProps) {
    this.props = props;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string | undefined {
    return this.props.content;
  }

  get link(): string | undefined {
    return this.props.link;
  }

  get dateCreated(): string {
    return this.props.dateCreated;
  }

  get voteScore(): number {
    return this.props.voteScore;
  }

  get memberUsername(): string {
    return this.props.memberUsername;
  }

  get numComments (): number {
    return this.props.numComments
  }

  get canCastVote (): boolean {
    // TODO: implement this again! use the user state and member
    return false;
  }

  public static fromDomain(post: PostDm, user: UserDm | null): PostViewModel {
    const postProps = post.props;
    const props: PostViewModelProps = {
      title: postProps.title,
      content: postProps.content,
      link: postProps.link,
      dateCreated: postProps.dateCreated,
      memberUsername: postProps.memberUsername,
      voteScore: postProps.voteScore || 0,
      numComments: postProps.numComments
    };
    return new PostViewModel(props);
  }
}
