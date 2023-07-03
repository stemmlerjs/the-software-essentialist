
import { EmailAPI } from "./email/application/emailAPI";
import { ForumAPI } from "./forum/application/forumAPI";
import { UserAPI } from "./users/application/usersAPI";

export interface ApplicationAPI {
  users: UserAPI;
  forum: ForumAPI;
  email: EmailAPI;
}