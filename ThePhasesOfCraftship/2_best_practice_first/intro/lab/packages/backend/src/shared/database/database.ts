
import { UserRepo } from "../../modules/users/userRepo";
import { PostRepo } from "../../modules/posts/postRepo";

export interface Database {
  users: UserRepo;
  posts: PostRepo;
}