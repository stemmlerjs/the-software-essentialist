import { PostDTO } from "@dddforum/shared/src/api/posts";
import { Member, Post } from "@prisma/client";
import { MemberReadModel } from "../../members/domain/memberReadModel";

interface PostReadModelProps {
  id: string;
  title: string;
  content: string;
  member: MemberReadModel;
}

export class PostReadModel {

  private props: PostReadModelProps;

  constructor (props: PostReadModelProps) {
    this.props = props;
  }

  public static fromPrisma (prismaPost: Post, member: Member): PostReadModel {
    return new PostReadModel({
      id: prismaPost.id,
      title: prismaPost.title,
      content: prismaPost.content,
      member: MemberReadModel.fromPrisma(member)
    })
  }

  public toDTO (): PostDTO {
    return {
      id: this.props.id,
      title: this.props.title,
      content: 'content',
      member: t
    }
  }
}
