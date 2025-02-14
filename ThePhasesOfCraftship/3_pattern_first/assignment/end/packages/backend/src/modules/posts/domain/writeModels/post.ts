import { CreatePostInput, PostDTO } from "@dddforum/shared/src/api/posts";
import { Votes } from "./votes";
import { Post as PostPrismaModel } from "@prisma/client";
import { Member as MemberPrismaModel } from "@prisma/client";
import { ValidationError } from "@dddforum/shared/src/errors";
import { randomUUID } from "node:crypto";

interface PostProps {
  id: string;
  memberId: string;
  title: string;
  link?: string;
  votes: Votes;
  content?: string;
  postType: 'link' | 'text';
}

export class Post {
  constructor (private props: PostProps) {

  }

  id () {
    return this.props.id
  }

  get title () {
    return this.props.title;
  }

  get link () {
    return this.props.link;
  }

  get votes () {
    return this.props.votes;
  }

  public static create (input: CreatePostInput): Post | ValidationError {
    const votes = Votes.create();

    // Todo: setup id
    // Todo: setup timestamp (date created)
    
    return new Post({
      ...input,
      id: randomUUID(),
      votes,
    });
  }

  public static fromPrismaToDomain (prismaModel: PostPrismaModel): Post {
    return new Post({
      id: prismaModel.id,
      memberId: prismaModel.memberId,
      title: prismaModel.title,
      content: prismaModel.content,
      postType: prismaModel.postType as 'link' | 'text', // TODO: value object-ify
      votes: Votes.create(),
    });
  }

  public static toDTO (postModel: PostPrismaModel, memberModel: MemberPrismaModel): PostDTO {
    return {
      id: postModel.id,
      title: postModel.title,
      content: postModel.content,
      postType: postModel.postType,
      dateCreated: postModel.dateCreated.toISOString(),
      member: {
        memberId: postModel.memberId,
        // TODO: ensure in model
        username: memberModel.username,
      },
      // TODO: add.
      voteScore: postModel.voteScore,
      comments: []
    }

  }

  // public toDTO (): PostDTO {
  //   // TODO: implement this
  //   return {
  //     id: "123",
  //     member: {
  //       memberId: "123",
  //     },
  //     title: this.props.title,
  //     content: this.props.content,
  //     votes: [],
  //     postType: "text",
  //     comments: [],
  //     dateCreated: new Date().toISOString(),
  //   }
  // }
}
