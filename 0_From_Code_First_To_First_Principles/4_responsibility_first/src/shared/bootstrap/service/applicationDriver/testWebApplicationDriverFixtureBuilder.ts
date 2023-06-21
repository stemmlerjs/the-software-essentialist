
import { User, UserInput } from "../../../../modules/users/domain/user";
import { Repos } from "../compositionRoot/compositionRoot";

export class TestWebApplicationDriverFixtureBuilder {

  private existingUsers: User[];

  constructor (private repos: Repos) {
    this.existingUsers = [];
  }

  async build () {
    for (let user of this.existingUsers) {
      // This will need access to the database, but it will go ahead and create
       // the users as necessary using the repos.
      await this.repos.usersRepo.saveAndPublishEvents(user)
    }
    
    return this;
  }

  withExistingUsers (userInputs: UserInput[]) {
    userInputs.forEach((input) => this.existingUsers.push(User.create(input)));
    return this
  }
}