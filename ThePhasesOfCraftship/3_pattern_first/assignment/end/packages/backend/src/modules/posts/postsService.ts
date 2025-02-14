
import { PostReadModel } from "./domain/readModels/postReadModel";
import { Post } from "./domain/writeModels/post";
import { CreatePostCommand } from "./postsCommands";
import { GetPostsQuery } from "./postsQuery";
import { PostsRepository } from "./repos/ports/postsRepository";

export class PostsService {
  constructor(private postsRepo: PostsRepository) {}

  async getPosts(query: GetPostsQuery) {
    const sort = query.sort;
    const posts = await this.postsRepo.findPosts(sort);
    return posts.map((post) => PostReadModel.fromPrismaToReadModel(post));
  }

  async createPost (command: CreatePostCommand) {
    // let post = Post.create({
    //   title: command.props.title,
    //   content: command.props.content
    // });
    // let saveResult = await this.repository.save(post);
    // if (saveResult instanceof Error) {
    //   return saveResult;
    // }
    // return post;
  }

  async getPostDetailsById (id: string) {
    const postOrNotFound = await this.postsRepo.getPostById(id);

    if (!postOrNotFound) {
      return PostNotFoundError()
    }
  }
}
