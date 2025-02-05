
import { PostsRepository } from "../ports/postsRepository";
import { PostReadModel } from "../domain/postReadModel"

export class InMemoryPostsRepository implements PostsRepository {
  private posts: PostReadModel[];

  constructor (posts?: PostReadModel[]) {
    this.posts = posts ? posts : []
  }

  async findPosts(_sort: string): Promise<PostReadModel[]> {
    return this.posts;
  }

  public static createWithSeedData (): InMemoryPostsRepository {
    return new InMemoryPostsRepository([]);
  }
}
