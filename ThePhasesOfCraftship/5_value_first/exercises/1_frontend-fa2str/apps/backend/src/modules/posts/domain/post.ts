import { CreatePostInput } from "@dddforum/api/posts";
import { Post as PostPrismaModel } from "@prisma/client";
import { ValidationError } from "@dddforum/errors";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { PostType } from "./postType";
import { AggregateRoot } from "@dddforum/core/aggregateRoot";
import { PostCreated } from "./postCreated";

interface PostProps {
  id: string;
  memberId: string;
  title: string;
  link?: string;
  content?: string;
  postType: PostType;
  voteScore: number;
}

const createTextPostSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(5).max(3000).optional(),
});

const createLinkPostSchema = z.object({
  title: z.string().min(5).max(100),
  link: z.string().url(),
});

export class Post extends AggregateRoot {
  constructor (
    private props: PostProps
  ) {
    super();
  }

  get id () {
    return this.props.id
  }

  get title () {
    return this.props.title;
  }

  get link () {
    return this.props.link;
  }

  get memberId() {
    return this.props.memberId;
  }

  get content() {
    return this.props.content;
  }

  get postType() {
    return this.props.postType;
  }

  get voteScore () {
    return this.props.voteScore
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

    const post = new Post({
      ...input,
      voteScore: 0,
      id: postId,
    });

    const postCreated = PostCreated.create({ memberId: input.memberId, postId })
    post.domainEvents.push(postCreated);

    return post;
  }

  public static toDomain (prismaModel: PostPrismaModel): Post {
    return new Post({
      id: prismaModel.id,
      memberId: prismaModel.memberId,
      title: prismaModel.title,
      content: prismaModel.content ? prismaModel.content : undefined,
      link: prismaModel.link ? prismaModel.link : undefined,
      postType: prismaModel.postType as PostType,
      voteScore: prismaModel.voteScore
    });
  }
}
