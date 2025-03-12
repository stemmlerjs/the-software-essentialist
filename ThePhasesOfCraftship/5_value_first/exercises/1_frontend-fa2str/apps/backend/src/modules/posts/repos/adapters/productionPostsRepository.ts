
import { Prisma, PrismaClient } from "@prisma/client";
import { PostsRepository } from "../ports/postsRepository";
import { Post } from "../../domain/post";
import { PostReadModel } from "../../domain/postReadModel";
import { CommentReadModel } from "../../domain/commentReadModel";
import { MemberReadModel } from "../../../members/domain/memberReadModel";
import { DomainEvent } from "@dddforum/core";
import { EventOutboxTable } from "@dddforum/outbox";
import { ServerErrors } from '@dddforum/errors'
import { Queries } from "@dddforum/api/posts";

export class ProductionPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaClient, private eventsTable: EventOutboxTable) {}

  saveAggregateAndEvents(post: Post, events: DomainEvent[]): Promise<void> {
    return this.prisma.$transaction(async (tx) => {
      await this.save(post, tx);
      await this.eventsTable.save(events, tx);
    })
  }

  async getPostById(id: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        memberPostedBy: true,
        comments: {
          include: {
            memberPostedBy: true
          }
        },
      },
    });

    if (!post) {
      return null;
    }

    return Post.toDomain(
      post,
    );
  }

  async findPosts(query: Queries.GetPostsQuery): Promise<PostReadModel[]> {
    const sqlQuery = {
      orderBy: {},
      include: {
        memberPostedBy: true,
        comments: {
          include: {
            memberPostedBy: true
          }
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    };

    if (query.sort === "popular") {
      sqlQuery.orderBy = { voteScore: "desc" }
    }

    if (query.sort === "recent") {
      sqlQuery.orderBy = { dateCreated: "desc" }
    }

    const posts = await this.prisma.post.findMany(sqlQuery);

    return posts.map((post) =>
      PostReadModel.fromPrismaToDomain(
        post,
        MemberReadModel.fromPrisma(post.memberPostedBy),
        post.comments.map((c) => CommentReadModel.fromPrismaToDomain(c, MemberReadModel.fromPrisma(c.memberPostedBy))),
      ),
    );
  }

  public async getPostDetailsById(id: string): Promise<PostReadModel | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        memberPostedBy: true,
        comments: {
          include: {
            memberPostedBy: true
          }
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    const voteScore = await this.prisma.postVote.aggregate({
      _sum: { value: true },
      where: { postId: id },
    }).then(result => result._sum.value || 0);

    return PostReadModel.fromPrismaToDomain(
      { ...post, voteScore },
      MemberReadModel.fromPrisma(post.memberPostedBy),
      post.comments.map((c) => CommentReadModel.fromPrismaToDomain(c, MemberReadModel.fromPrisma(c.memberPostedBy))),
    );
  }

  async save(post: Post, transaction?: Prisma.TransactionClient): Promise<void | ServerErrors.DatabaseError> {
    const prismaInstance = transaction ? transaction : this.prisma;

    try {
      await prismaInstance.post.upsert({
        where: { id: post.id },
        update: {
          title: post.title,
          content: post.content,
          voteScore: post.voteScore,
          memberId: post.memberId,
        },
        create: {
          id: post.id,
          title: post.title,
          postType: post.postType,
          content: post.content,
          link: post.link,
          voteScore: post.voteScore,
          memberId: post.memberId
        },
      });
    } catch (error) {
      console.log(error);
      throw new ServerErrors.DatabaseError();
    }
  }
}
