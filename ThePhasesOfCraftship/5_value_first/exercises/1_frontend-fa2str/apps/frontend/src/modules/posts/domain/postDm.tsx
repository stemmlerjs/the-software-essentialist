import { PostDTO } from "@dddforum/api/posts";

interface PostDmProps {
  title: string;
  content?: string;
  link?: string;
  memberId: string;
  memberUsername: string;
  dateCreated: string;
  voteScore?: number;
  numComments: number;
}

export class PostDm {

  constructor(public props: PostDmProps) {

  }

  static fromDTO(dto: PostDTO): PostDm {
    return new PostDm({
      title: dto.title,
      content: dto.content,
      link: dto.link,
      memberId: dto.member.memberId,
      memberUsername: dto.member.username,
      dateCreated: dto.dateCreated,
      voteScore: dto.voteScore,
      numComments: dto.comments.length
    });
  }
}
