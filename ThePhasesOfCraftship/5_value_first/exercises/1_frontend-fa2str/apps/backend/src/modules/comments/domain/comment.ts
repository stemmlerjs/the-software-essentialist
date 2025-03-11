
import { VoteType } from "@dddforum/api/src/votes";
import { Member } from "../../members/domain/member";
import { Comment as CommentPrismaModel } from "@prisma/client";

interface CommentProps {
  id: string;
  text: string;
  postId: string;
  memberId: string;
  parentCommentId: string | null;
}

export class Comment {

  constructor (private props: CommentProps) {
  }

  public vote (member: Member, voteType: VoteType) {

  }

  get id () {
    return this.props.id;
  }

  public static toDomain (recreationProps: CommentPrismaModel | CommentProps): Comment {
      return new Comment({
        id: recreationProps.id,
        text: recreationProps.text,
        postId: recreationProps.postId,
        memberId: recreationProps.memberId,
        parentCommentId: recreationProps.parentCommentId
      });
    }
}
