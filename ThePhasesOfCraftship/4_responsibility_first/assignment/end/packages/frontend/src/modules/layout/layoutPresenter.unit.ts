
import { UserLoginViewModel } from '@dddforum/frontend/src/modules/users/application/userLoginViewModel';
import { FakeNavigationRepository } from '../../navigation/repos/fakeNavigationRepository';
import { FakeUsersRepository } from '../users/repos/fakeUsersRepo';
import { fakeUserData } from '../users/__tests__/fakeUserData';
import { NavLoginPresenter } from './layoutPresenter';
import { UsersRepository } from '../users/repos/usersRepo';
import { NavigationRepository } from '../../navigation/repos/navigationRepository';
import { UserDTO } from '@dddforum/shared/src/api/users';


describe('navLoginPresnter', () => {
  
  let usersRepository: UsersRepository;
  let navigationRepository: NavigationRepository;
  let navLoginPresenter: NavLoginPresenter;
  let loadedUserLoginVm: UserLoginViewModel;

  function setup (userDTO: UserDTO | null, currentRoute: string = "/") {
    usersRepository = new FakeUsersRepository(userDTO);
    navigationRepository = new FakeNavigationRepository(currentRoute);
    navLoginPresenter = new NavLoginPresenter(
      usersRepository, 
      navigationRepository
    );
  }

  it ('should render the username if is present', async () => {
    setup(fakeUserData);

    await navLoginPresenter.load((userLoginVm) => {
      loadedUserLoginVm = userLoginVm;
    });

    expect(loadedUserLoginVm.username).toBe('khalilstemmler');
  });
  it ('should not render the username if user details arent present', async () => {
    setup(null);

    await navLoginPresenter.load((userLoginVm) => {
      loadedUserLoginVm = userLoginVm;
    });

    expect(loadedUserLoginVm.username).toBeNull();
  });

  it ('should render "Join" if user details arent present and is not on the register (/join) page', async () => {
    setup(null);

    await navLoginPresenter.load((userLoginVm) => {
      loadedUserLoginVm = userLoginVm;
    });

    expect(loadedUserLoginVm.linkText).toBe('Join');
    expect(loadedUserLoginVm.pathname).toBe('/');

    setup(null, '/join');

    await navLoginPresenter.load((userLoginVm) => {
      loadedUserLoginVm = userLoginVm;
    });

    expect(loadedUserLoginVm.linkText).toBe("")
    expect(loadedUserLoginVm.pathname).toBe('/join');
  });
});
