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

  it('should allow to keep an edited user email', async () => {
    const updatedName = 'update name';
    
    const udatedUser = {...userMock, name: updatedName};

    const user = await userService.editUser(firstUserID, udatedUser);

    expect(user).toBeDefined();
    expect(user.name).toBe(updatedName);
    expect(user.email).toBe(userMock.email);
  });

});
