
import { MarketingService } from "../../modules/marketing/marketingService"
import { PostService } from "../../modules/posts/postService"
import { UserService } from "../../modules/users/usersService"

export interface Application {
  user: UserService;
  posts: PostService;
  marketing: MarketingService;
}