
import { CommentDTO } from "@dddforum/api/src/comments";
import { Comment as PrismaCommentModel } from "@prisma/client";
import { MemberReadModel } from "../../members/domain/memberReadModel";

interface CommentReadModelProps {
  id: string;
  text: string;
  dateCreated: string;
  member: MemberReadModel
}

export class CommentReadModel {

  private props: CommentReadModelProps;

  constructor (props: CommentReadModelProps) {
    this.props = props;
  }

  public static fromPrismaToDomain (commentModel: PrismaCommentModel, member: MemberReadModel): CommentReadModel {
    return new CommentReadModel({
      id: commentModel.id,
      text: commentModel.text,
      dateCreated: commentModel.dateCreated.toISOString(),
      member: member
    });
  }

  public toDTO (): CommentDTO {
    return {
      id: this.props.id,
      text: this.props.text,
      dateCreated: this.props.dateCreated,
      member: {
        memberId: this.props.member.id,
        username: this.props.member.username,
        userId: this.props.member.userId,
        reputationLevel: this.props.member.reputationLevel,
        reputationScore: this.props.member.reputationScore
      }
    }
  }
}
