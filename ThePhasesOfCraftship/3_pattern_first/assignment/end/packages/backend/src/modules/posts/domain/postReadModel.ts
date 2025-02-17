import { PostDTO } from "@dddforum/shared/src/api/posts";
import { Post } from "@prisma/client";
import { CommentReadModel } from "./commentReadModel";
import { MemberReadModel } from "../../members/domain/memberReadModel";

interface PostReadModelProps {
  id: string;
  title: string;
  content: string;
  member: MemberReadModel;
  comments: CommentReadModel[];
  voteScore: number;
}

export class PostReadModel {

  private props: PostReadModelProps;

  constructor (props: PostReadModelProps) {
    this.props = props;
  }

  get id (): string {
    return this.props.id;
  }

  public static fromPrismaToDomain (prismaPost: Post, member: MemberReadModel, comments: CommentReadModel[]): PostReadModel {
    
    return new PostReadModel({
      id: prismaPost.id,
      title: prismaPost.title,
      content: prismaPost.content,
      member: member,
      comments: comments,
      voteScore: prismaPost.voteScore,
    })
  }

  public toDTO (): PostDTO {
    return {
      id: this.props.id,
      title: this.props.title,
      content: 'content',
      postType: 'post',
      dateCreated: new Date().toISOString(),
      member: this.props.member.toDTO(),
      comments: this.props.comments.map((c) => c.toDTO()),
      voteScore: this.props.voteScore
    }
  }
}


