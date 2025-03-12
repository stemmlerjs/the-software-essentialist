
import { MarketingService } from "../../modules/marketing/application/marketingService";
import { NotificationsService } from "../../modules/notifications/application/notificationsService";
import { PostsService } from "../../modules/posts/application/postsService";
import { UserIdentityService } from "../../modules/users/application/userIdentityService";
import { VotesService } from "../../modules/votes/application/votesService";

export interface Application {
  users: UserIdentityService;
  posts: PostsService;
  marketing: MarketingService;
  notifications: NotificationsService;
  votes: VotesService;
}
