
import { killProcessOnPort } from '../infra/process/killOnPort';
import { ExpressRESTAPI } from '../infra/api/expressRestAPI'

export class E2EWebTestDriver {
  
  constructor (private api: ExpressRESTAPI) {

  }

  registerUser () {

  }


  stop () {

  }

  start () {
    
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

  async setup () {
    killProcessOnPort(3000);
    await this.api.start();
  }
}