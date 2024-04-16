
import { PrismaClient } from "@prisma/client";
import { InMemoryUserRepo } from "./inMemoryUserRepo";
import { ProductionUserRepo } from "./productionUserRepo";
import { UserDTOBuilder } from "@dddforum/shared/tests/support/builders/userDTOBuilder";

describe("userRepo", () => {
  let userRepos = [
    new InMemoryUserRepo(),
    new ProductionUserRepo(new PrismaClient()),
  ];

  it("can save and retrieve users by email", () => {
    let createUserInput = new UserDTOBuilder().withAllRandomDetails().build();

    userRepos.forEach(async (userRepo) => {
      let savedUserResult = await userRepo.save({
        ...createUserInput,
        password: "",
      });
      let fetchedUserResult = await userRepo.getUserByEmail(
        createUserInput.email,
      );

      expect(savedUserResult).toBeDefined();
      expect(fetchedUserResult).toBeDefined();
      expect(savedUserResult.email).toEqual(fetchedUserResult?.email);
    });
  });

  it("can find a user by username", () => {
    let createUserInput = new UserDTOBuilder()
      .withAllRandomDetails()
      .withRandomUsername()
      .build();

    userRepos.forEach(async (userRepo) => {
      let savedUserResult = await userRepo.save({
        ...createUserInput,
        password: "",
      });
      let fetchedUserResult = await userRepo.getUserByUsername(
        createUserInput.username,
      );

      expect(savedUserResult).toBeDefined();
      expect(fetchedUserResult).toBeDefined();
      expect(savedUserResult.username).toEqual(fetchedUserResult?.username);
    });
  });
});
