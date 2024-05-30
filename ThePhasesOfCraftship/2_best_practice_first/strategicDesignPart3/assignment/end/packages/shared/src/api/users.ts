export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export type CreateUserResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};
