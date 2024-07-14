
import { PrismaClient } from "@prisma/client";
import { ProductionUserRepository } from "../adapters/productionUserRepository";
import { UserBuilder } from '@dddforum/shared/tests/support/builders/users'
import { UsersRepository } from "./usersRepository";
import { InMemoryUserRepositorySpy } from "../adapters/inMemoryUserRepositorySpy";

describe("userRepo", () => {
  let userRepos: UsersRepository[] = [
    new ProductionUserRepository(new PrismaClient()),
    new InMemoryUserRepositorySpy()
  ];

  it("can save and retrieve users by email", () => {
    let createUserInput = new UserBuilder()
      .makeValidatedUserBuilder()
      .withAllRandomDetails()
      .build()

    userRepos.forEach(async (userRepo) => {
      let savedUserResult = await userRepo.save({
        ...createUserInput,
        password: '',
      });
      let fetchedUserResult = await userRepo.findUserByEmail(
        createUserInput.email,
      );

      expect(savedUserResult).toBeDefined();
      expect(fetchedUserResult).toBeDefined();
      expect(savedUserResult.email).toEqual(fetchedUserResult?.email);
    });
  });

  it("can find a user by username", () => {
    let createUserInput = new UserBuilder()
      .makeValidatedUserBuilder()
      .withAllRandomDetails()
      .build();

    userRepos.forEach(async (userRepo) => {
      let savedUserResult = await userRepo.save({
        ...createUserInput,
        password: "",
      });
      let fetchedUserResult = await userRepo.findUserByUsername(
        createUserInput.username,
      );

      expect(savedUserResult).toBeDefined();
      expect(fetchedUserResult).toBeDefined();
      expect(savedUserResult.username).toEqual(fetchedUserResult?.username);
    });
  });
});
