
export const savedUser = {
  id: 1,
  email: "saved@email",
  username: 'savedUser',
  firstName: 'user',
  lastName: 'saved',
  password: "password"
};

const userDataMock = [ savedUser ];

export const DBMock = {
  user: {
    create: jest.fn().mockImplementation(({ data }) => {
      userDataMock.push(data);
      return Promise.resolve(data);
    } ),
    findUnique: jest.fn().mockImplementation((query) => {
      if (query.where.id === userDataMock[0].id) {
        return Promise.resolve(userDataMock[0]);
      }
      if (query.where.email === userDataMock[0].email) {
        return Promise.resolve(userDataMock[0]);
      }
      return undefined
    } ),
    update: jest.fn().mockImplementation((query) => {
      if (query.where.id === userDataMock[0].id) {
        userDataMock[0] = query.data;
        return Promise.resolve(userDataMock[0]);
      }
      return undefined
    } ),  
  },
}