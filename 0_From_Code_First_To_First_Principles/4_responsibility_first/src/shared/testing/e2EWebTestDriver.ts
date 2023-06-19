
import { killProcessOnPort } from '../infra/process/killOnPort';
import { ExpressRESTAPI } from '../infra/api/expressRestAPI'
import { Repos } from '../../modules/compositionRoot';

class E2ETestFixtureBuilder {

  constructor (private repos: Repos) {

  }

  async build () {
    return this;
  }

  withExistingUsers (any: []) {
    
    // This will need access to the database, but it will go ahead and create
    // the users as necessary using the repos.
    return this
  }
}

export class E2EWebTestDriver {
  
  constructor (private api: ExpressRESTAPI, private repos: Repos) {

  }

  registerUser () {

  }


  stop () {

  }

  reset () {
    // Clears the database
    // Clears any other services
    // Kills any processes that might be running
    // Recreates the database from scratch
    // Runs the migrations
    // Runs any seeders
  }

  start () {
    
  }

  builder () {
    return new E2ETestFixtureBuilder(this.repos)
  }

  createExistingMember () {

  }

  registerAsMember () {

  }

  submitPost () {

  }

  getPostVotes () {
    return [ { memberId: '' } ]
  }

  leaveCommentOnPost () {

  }

  checkFirstUpvoteAchievementEmail () {
    
  }

  checkCommentNotificationEmail () {

  }

  upvotePost () {

  }

  async setup () {
    killProcessOnPort(3000);
    await this.api.start();
  }
}