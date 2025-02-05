import { PostDTO } from "@dddforum/shared/src/api/posts";
import { Comment, Member, Post, Vote } from "@prisma/client";
import { MemberReadModel } from "../../members/domain/memberReadModel";
import { CommentReadModel } from "./commentReadModel";
import { VoteReadModel } from "./voteReadModel";

interface PostReadModelProps {
  id: string;
  title: string;
  content: string;
  member: MemberReadModel;
  comments: CommentReadModel[];
  votes: VoteReadModel[]
}

export class PostReadModel {

  private props: PostReadModelProps;

  constructor (props: PostReadModelProps) {
    this.props = props;
  }

  public static fromPrisma (prismaPost: Post, member: Member, comments: Comment[], votes: Vote[]): PostReadModel {
    return new PostReadModel({
      id: prismaPost.id,
      title: prismaPost.title,
      content: prismaPost.content,
      member: MemberReadModel.fromPrisma(member),
      comments: comments.map((c) => CommentReadModel.fromPrisma(c)),
      votes: votes.map((v) => VoteReadModel.fromPrisma(v))
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
      votes: this.props.votes.map((v) => v.toDTO())
    }
  }
}
