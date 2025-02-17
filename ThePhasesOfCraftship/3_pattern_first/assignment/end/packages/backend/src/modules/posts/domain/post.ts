
import { CreatePostInput } from "@dddforum/shared/src/api/posts";
import { Post as PostPrismaModel } from "@prisma/client";
import { ValidationError } from "@dddforum/shared/src/errors";
import { randomUUID } from "node:crypto";
import { z } from "zod";

interface PostProps {
  id: string;
  memberId: string;
  title: string;
  link?: string;
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

  get id () {
    return this.props.id
  }

  get title () {
    return this.props.title;
  }

  get link () {
    return this.props.link;
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

    return new Post({
      ...input,
      id: postId,
    });
  }

  public static fromPrismaToDomain (prismaModel: PostPrismaModel): Post {
    return new Post({
      id: prismaModel.id,
      memberId: prismaModel.memberId,
      title: prismaModel.title,
      content: prismaModel.content,
      postType: prismaModel.postType as 'link' | 'text', // TODO: value object-ify
    });
  }
}
