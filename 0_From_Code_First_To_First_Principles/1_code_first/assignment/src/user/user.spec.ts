import { UserService } from "./userService";
import { DBMock, savedUser } from "./user.mock";


jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => (DBMock)),
}));


describe('UserService', () => {
  let userService: UserService = new UserService();

  it('should return an existing user by email', async () => {
    const user = await userService.getUserByEmail(savedUser.email);

    expect(user).toBeDefined();
    expect(user.email).toBe(savedUser.email);
  });

  it('should create a user with valid input', async () => {
    const user = await userService.createUser({
      email: 'new@email',
      name: 'Test User',
      password: 'password'
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('new@email');
  });

  it('should edit a user with valid ID', async () => {
    const user = await userService.editUser(savedUser.id, {
      email: 'updated@email',
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('updated@email');
  });

});
