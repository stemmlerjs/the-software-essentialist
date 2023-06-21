import { Repos } from '../compositionRoot/compositionRoot';
import { ExpressRESTAPI } from '../../../infra/api/expressRestAPI';
import { DatabaseConnection } from '../../../infra/database/ports/databaseConnection';
import { killProcessOnPort } from '../processService/killOnPort';
import { ApplicationDriver } from './applicationDriver';
import { TestWebApplicationDriverFixtureBuilder } from './testWebApplicationDriverFixtureBuilder';

export class TestWebApplicationDriver extends ApplicationDriver {
  constructor(
    protected api: ExpressRESTAPI,
    protected db: DatabaseConnection,
    private repos: Repos,
  ) {
    super(api, db);
  }

  async reset() {
    // Clears the database
    // Recreates the database from scratch
    // Kills any processes that might be running
    killProcessOnPort(3000);
  }

  builder() {
    return new TestWebApplicationDriverFixtureBuilder(this.repos);
  }

  registerUser() {}

  createExistingMember() {}

  registerAsMember() {}

  submitPost() {}

  getPostVotes() {
    return [{ memberId: '' }];
  }

  leaveCommentOnPost() {}

  checkFirstUpvoteAchievementEmail() {}

  checkCommentNotificationEmail() {}

  upvotePost() {}
  
}
