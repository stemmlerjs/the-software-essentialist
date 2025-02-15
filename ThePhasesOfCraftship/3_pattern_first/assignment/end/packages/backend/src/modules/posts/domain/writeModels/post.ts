
import { CreatePostInput } from "@dddforum/shared/src/api/posts";
import { Votes } from "./votes";
import { Post as PostPrismaModel } from "@prisma/client";
import { ValidationError } from "@dddforum/shared/src/errors";
import { randomUUID } from "node:crypto";
import { z } from "zod";

interface PostProps {
  id: string;
  memberId: string;
  title: string;
  link?: string;
  votes: Votes;
  content?: string;
  postType: 'link' | 'text';
}

const createTextPostSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(5).max(3000).optional(),
});

const createLinkPostSchema = z.object({
  title: z.string().min(5).max(100),
  link: z.string().url(),
});

export class Post {
  constructor (
    private props: PostProps
  ) {

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
    const isTextPost = input.postType === 'text';

    if (isTextPost) {
      
      const validationResult = createTextPostSchema.safeParse(input);

      if (!validationResult.success) {
        return new ValidationError(validationResult.error.errors.map(e => e.message).join(", "));
      }
    } else {
      const linkPostValidationResult = createLinkPostSchema.safeParse(input);

      if (!linkPostValidationResult.success) {
        return new ValidationError(linkPostValidationResult.error.errors.map(e => e.message).join(", "));
      }
    }

    const postId = randomUUID();
    
    const votes = Votes.create();

    votes.addUpvote(input.memberId, postId);

    return new Post({
      ...input,
      id: postId,
      votes
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

  // public static toDTO (postModel: PostPrismaModel, memberModel: MemberPrismaModel): PostDTO {
  //   return {
  //     id: postModel.id,
  //     title: postModel.title,
  //     content: postModel.content,
  //     postType: postModel.postType,
  //     dateCreated: postModel.dateCreated.toISOString(),
  //     member: {
  //       memberId: postModel.memberId,
  //       // TODO: ensure in model
  //       username: memberModel.username,
  //     },
  //     // TODO: add.
  //     voteScore: postModel.voteScore,
  //     comments: []
  //   }

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
