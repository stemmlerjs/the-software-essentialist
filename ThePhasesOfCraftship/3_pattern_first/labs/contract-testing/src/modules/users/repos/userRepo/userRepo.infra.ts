
import { User } from "../../domain/user";
import { InMemoryUserRepo } from "./implementations/memory/inMemoryUserRepo";
import { JSONUserRepo } from "./implementations/json/jsonUserRepo";
import { SequelizeUserRepo } from "./implementations/sequelize/sequelizeUserRepo";
import { UserRepo } from "./userRepo";

describe("userRepo", () => {
  // All repos to verify that the contract is correct for
  

  let userRepos: UserRepo[] = [];


  const userToSave = User.create({
    firstName: "khalil",
    lastName: "stemmler",
    email: "khalil@essentialist.dev",
  });

  beforeAll(async () => {
    await new SequelizeUserRepo().setupDatabase();
  });

  beforeEach(() => {
    
    /**
     * We should use database fixture/builders here to setup and teardown the state 
     * of the world.
     * 
     * See here for how to write expressive, declarative fixtures: 
     * https://github.com/stemmlerjs/the-software-essentialist/blob/f0dba1912aef6c2256bb70efa962afeba31ebe19/ThePhasesOfCraftship/2_best_practice_first/assignment/end/packages/backend/tests/features/registration.e2e.ts#L233C44-L233C44
     */
    userRepos = [
      new JSONUserRepo(),
      // new SequelizeUserRepo(),
      new InMemoryUserRepo()
    ];
  });

  it("can save users", async () => {
    for (let userRepo of userRepos) {
      

      if (!userToSave) throw new Error("validation error");

      await userRepo.save(userToSave);
      let savedUser = await userRepo.getById(userToSave.getId());

      if (!savedUser) throw new Error("couldnt find saved user " + userRepo.constructor,);

      expect(savedUser.getId() === userToSave.getId()).toBeTruthy();
    }
  });
});
