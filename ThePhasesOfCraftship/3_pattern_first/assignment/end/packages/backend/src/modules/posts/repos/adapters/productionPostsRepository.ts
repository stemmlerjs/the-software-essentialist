import { PrismaClient } from "@prisma/client";
import { PostsRepository } from "../ports/postsRepository";
import { DatabaseError } from "../../../../shared/exceptions";
import { Post } from "../../domain/writeModels/post";
import { GetPostsQuery } from "../../postsQuery";
import { PostReadModel } from "../../domain/readModels/postReadModel";
import { CommentReadModel } from "../../domain/readModels/commentReadModel";
import { MemberReadModel } from "../../../members/domain/memberReadModel";

export class ProductionPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaClient) {}

  getPostById(id: string): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }

  async findPosts(query: GetPostsQuery): Promise<PostReadModel[]> {
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

  async save(post: Post): Promise<void | DatabaseError> {
    return;
  }
}
