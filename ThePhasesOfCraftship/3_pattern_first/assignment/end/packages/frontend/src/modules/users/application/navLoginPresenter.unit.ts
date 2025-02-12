

import { UserLoginViewModel } from '@dddforum/frontend/src/modules/users/application/userLoginViewModel';
import { FakeNavigationRepository } from '../../navigation/repos/fakeNavigationRepository';
import { FakeUsersRepository } from '../repos/fakeUsersRepo';
import { fakeUserData } from '../__tests__/fakeUserData';
import { NavLoginPresenter } from './navLoginPresenter';

describe('navLoginPresnter', () => {
  
  let usersRepository = new FakeUsersRepository(fakeUserData);
  let navigationRepository = new FakeNavigationRepository();
  let navLoginPresenter = new NavLoginPresenter(
    usersRepository, 
    navigationRepository
  );
  let userLogin: UserLoginViewModel;

  it ('should render the username if the user is authenticated', async () => {});
  it ('should not render the user email if the user is not authenticated', async () => {});
  it ('should render "Join" if the user is not authenticated', async () => {})
});
