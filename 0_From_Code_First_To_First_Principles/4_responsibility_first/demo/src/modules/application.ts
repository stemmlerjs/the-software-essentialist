import { ApplicationAPI } from './applicationAPI';
import { EmailAPI } from './email/application/emailAPI';
import { ForumAPI } from './forum/application/forumAPI';
import { UserAPI } from './users/application/usersAPI';

export class Application implements ApplicationAPI {
  constructor(
    public users: UserAPI,
    public forum: ForumAPI,
    public email: EmailAPI,
  ) {}
}
