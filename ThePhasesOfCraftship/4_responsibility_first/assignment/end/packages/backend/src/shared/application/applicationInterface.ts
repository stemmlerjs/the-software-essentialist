
import { MarketingService } from "../../modules/marketing/application/marketingService";
import { NotificationsService } from "../../modules/notifications/application/notificationsService";
import { PostsService } from "../../modules/posts/application/postsService";
import { UsersService } from "../../modules/users/application/usersService";
import { VotesService } from "../../modules/votes/application/votesService";

export interface Application {
  users: UsersService;
  posts: PostsService;
  marketing: MarketingService;
  notifications: NotificationsService;
  votes: VotesService;
}
