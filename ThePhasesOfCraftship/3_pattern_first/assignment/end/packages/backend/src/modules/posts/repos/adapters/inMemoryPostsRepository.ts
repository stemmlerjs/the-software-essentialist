
import { PostsRepository } from "../ports/postsRepository";
import { PostReadModel } from "../domain/postReadModel"
import { Post } from "../domain/post";
import { DatabaseError } from "../../../shared/exceptions";

export class InMemoryPostsRepository implements PostsRepository {
  private posts: PostReadModel[];

  constructor (posts?: PostReadModel[]) {
    this.posts = posts ? posts : []
  }

  async findPosts(_sort: string): Promise<PostReadModel[]> {
    return this.posts;
  }

  public static createWithSeedData (): InMemoryPostsRepository {
    // Put seed data here
    return new InMemoryPostsRepository();
  }

  public async save(post: Post): Promise<void | DatabaseError> {

    return Promise.resolve();
    
  }
}
