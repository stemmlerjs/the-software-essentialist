import { UserService } from "./userService";

let savedUser = {
  id: 1,
  email: "saved@email",
  name: "Test User",
  password: "password"
};

let mockData = [ savedUser ];

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn().mockImplementation(({ data }) => {
        mockData.push(data);
        return Promise.resolve(data);
      } ),
      findUnique: jest.fn().mockImplementation((query) => {
        if (query.where.id === mockData[0].id) {
          return Promise.resolve(mockData[0]);
        }
        if (query.where.email === mockData[0].email) {
          return Promise.resolve(mockData[0]);
        }
        return undefined
      } ),
      update: jest.fn().mockImplementation((query) => {
        if (query.where.id === mockData[0].id) {
          mockData[0] = query.data;
          return Promise.resolve(mockData[0]);
        }
        return undefined
      } ),  
    },
  })),
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
