import { UserDm } from "../../users/domain/userDm";
import { PostDm } from "../domain/postDm";

export interface PostViewModelProps {
  title: string;
  content?: string;
  link?: string;
  dateCreated: string;
  memberUsername: string;
  voteScore: number;
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

  public static fromDomain(post: PostDm, user: UserDm | null): PostViewModel {
    const props: PostViewModelProps = {
      title: post.title,
      content: post.content,
      link: post.link,
      dateCreated: post.dateCreated,
      memberUsername: post.memberUsername,
      voteScore: post.voteScore
    };
    return new PostViewModel(props);
  }
}
