import { UserService } from "./user/userService";


const userMock = {
  email: 'newUser@email',
  name: 'Test User',
  password: 'password'
};

const firstUserID = 1;

describe('UserService and Prisma integration', () => {
  let userService: UserService = new UserService();

  it('should create a new user', async () => {
    const user = await userService.createUser(userMock);

    expect(user).toBeDefined();
    expect(user.email).toBe(userMock.email);
  });

  it('should init the auto-incremented ID value', async () => {
    const user = await userService.getUserByEmail(userMock.email);

    expect(user).toBeDefined();
    expect(user.id).toBe(firstUserID);
  });

  it('should edit an existing user', async () => {
    const updatedEmail = "updated@email";

    const user = await userService.editUser(firstUserID, { email: updatedEmail });

    expect(user).toBeDefined();
    expect(user.email).toBe(updatedEmail);
  });

});
