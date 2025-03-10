import { PostDTO } from "@dddforum/shared/src/api/posts";

interface PostDmProps {
  title: string;
  content?: string;
  link?: string;
  memberId: string;
  memberUsername: string;
  dateCreated?: string;
  voteScore?: number;
}

export class PostDm {
  title: string;
  content: string;
  link: string;
  memberId: string;
  memberUsername: string;
  dateCreated: string;
  voteScore: number;

  constructor(props: PostDmProps) {
    this.title = props.title;
    this.content = props.content || '';
    this.link = props.link || '';
    this.memberId = props.memberId;
    this.memberUsername = props.memberUsername;
    this.dateCreated = props.dateCreated || new Date().toISOString();
    this.voteScore = props.voteScore || 0;
  }

  static fromDTO(dto: PostDTO): PostDm {
    return new PostDm({
      title: dto.title,
      content: dto.content,
      link: dto.link,
      memberId: dto.member.memberId,
      memberUsername: dto.member.username,
      dateCreated: dto.dateCreated,
      voteScore: dto.voteScore
    });
  }
}
