import { Post } from "./domain/post";
import { PostsRepository } from "./ports/postsRepository";
import { CreatePostCommand } from "./postsCommands";
import { GetPostsQuery } from "./postsQuery";

export class PostsService {
  constructor(private repository: PostsRepository) {}

  async getPosts(query: GetPostsQuery) {
    const sort = query.sort;
    const posts = await this.repository.findPosts(sort);
    return posts;
  }

  async createPost (command: CreatePostCommand) {
    let post = Post.create({
      title: command.props.title,
      content: command.props.content
    });
    let saveResult = await this.repository.save(post);
    if (saveResult instanceof Error) {
      return saveResult;
    }
    return post;
  }
}
