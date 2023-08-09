import { UserService } from "./userService";
import { PrismaClient } from "@prisma/client";

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaClient;

  // Setup for each test
  beforeEach(() => {
    userService = new UserService();
    prisma = new PrismaClient();
  });

  // Test for createUser
  it('should create a user with valid input', async () => {
    // Mock Prisma's user.create method
    prisma.user.create = jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      password: 'password'
    });

    const user = await userService.createUser({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password'
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });

  // Test for editUser
  it('should edit a user with valid ID', async () => {
    // Mock Prisma's user.findUnique and user.update methods
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      password: 'password'
    });

    prisma.user.update = jest.fn().mockResolvedValue({
      id: 1,
      email: 'new@example.com',
      name: 'New User',
      password: 'password'
    });

    const user = await userService.editUser(1, {
      email: 'new@example.com',
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('new@example.com');
  });

  // Additional tests for other methods can be added here
});
