
import { PrismaClient } from "@prisma/client";
import { PostsRepository } from "../ports/postsRepository";
import { PostReadModel } from "../domain/postReadModel";
import { DatabaseError } from "../../../shared/exceptions";
import { Post } from "../domain/post";

export class ProductionPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaClient) {}
  async findPosts(_sort: "recent" | "popular"): Promise<PostReadModel[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        memberPostedBy: true,
        _count: {
          select: { 
            comments: true,
          },
        }
      },
    });

    return []
  }

  async save(post: Post): Promise<void | DatabaseError> {
    return;
  }
}
