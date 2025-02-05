
import { CommentDTO } from "@dddforum/shared/src/api/posts";
import { Comment } from "@prisma/client";

interface CommentReadModelProps {
  id: string;
  text: string;
}

export class CommentReadModel {

  private props: CommentReadModelProps;

  constructor (props: CommentReadModelProps) {
    this.props = props;
  }

  public static fromPrisma (commentModel: Comment) {
    return new CommentReadModel({
      id: commentModel.id,
      text: commentModel.text,
      dateCreated: comment.dateCreated
    });
  }

  public toDTO (): CommentDTO {
    return {
      id: this.props.id,
      text: this.props.text,
      dateCreated: this.props.
      member: MemberDTO;
    }
  }
}
