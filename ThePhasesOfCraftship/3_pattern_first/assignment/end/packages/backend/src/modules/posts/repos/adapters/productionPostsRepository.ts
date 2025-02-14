
import { PrismaClient } from "@prisma/client";
import { PostsRepository } from "../ports/postsRepository";
import { DatabaseError } from "../../../../shared/exceptions";
import { Post } from "../../domain/writeModels/post";
import { GetPostsQuery } from "../../postsQuery";

export class ProductionPostsRepository implements PostsRepository {

  constructor(private prisma: PrismaClient) {

  }
  
  getPostById(id: string): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }

  async findPosts(query: GetPostsQuery): Promise<Post[]> {
    // TODO: Implement the query option based on (_sort: "recent" | "popular");
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

    return posts.map((post) => Post.fromPrismaToDomain(post));
  }

  async save(post: Post): Promise<void | DatabaseError> {
    return;
  }
}
