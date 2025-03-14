
import { Users } from '@dddforum/api';
import { LayoutPresenter } from './layoutPresenter';
import { createAPIClient } from '@dddforum/api';

import { UserLoginLayoutViewModel } from './userLoginLayoutVm';
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';
import { FakeAuthService } from '@/modules/users/externalServices/fakeAuthService';
import { ProductionUsersRepository } from '@/modules/users/repos/productionUsersRepo';
import { fakeUserData } from '@/modules/users/__tests__/fakeUserData';
import { UsersRepository } from '@/modules/users/repos/usersRepo';
import { NavigationRepository } from '@/modules/navigation/repos/navigationRepository';
import { MembersStore } from '@/modules/members/members/membersStore';
import { FakeNavigationRepository } from '@/modules/navigation/repos/fakeNavigationRepository';


describe('navLoginPresnter', () => {
  
  let usersRepository: UsersRepository;
  let navigationRepository: NavigationRepository;
  let presenter: LayoutPresenter;
  let loadedVm: UserLoginLayoutViewModel;

  let fakeLocalStorage: FakeLocalStorage
  let mockedApi = createAPIClient('');
  const fakeAuthService = new FakeAuthService();
  const membersRepository = new MembersStore(); // TODO: lots of organizing to do here.

  function setup (userDTO: Users.UserDTO | null, currentRoute: string = "/") {
    fakeLocalStorage = new FakeLocalStorage();
    usersRepository = new ProductionUsersRepository(mockedApi, fakeLocalStorage, fakeAuthService);
    navigationRepository = new FakeNavigationRepository(currentRoute);
    presenter = new LayoutPresenter(
      usersRepository, 
      membersRepository
    );
  }

  it ('should render the username if is present', async () => {
    setup(fakeUserData);

    await presenter.load((userLoginLayoutVm) => {
      loadedVm = userLoginLayoutVm;
    });

    expect(loadedVm.username).toBe('khalilstemmler');
  });
  it ('should not render the username if user details arent present', async () => {
    setup(null);

    await presenter.load((userLoginLayoutVm) => {
      loadedVm = userLoginLayoutVm;
    });

    expect(loadedVm.username).toBeNull();
  });

  // TODO: Clean this up.
  // it ('should render "Join" if user details arent present and is not on the register (/join) page', async () => {
  //   setup(null);

  //   await presenter.load((userLoginLayoutVm) => {
  //     loadedVm = userLoginLayoutVm;
  //   });

  //   expect(loadedVm.linkText).toBe('Join');
  //   expect(loadedVm.pathname).toBe('/');

  //   setup(null, '/join');

  //   await presenter.load((userLoginLayoutVm) => {
  //     loadedVm = userLoginLayoutVm;
  //   });

  //   expect(loadedVm.linkText).toBe("")
  //   expect(loadedVm.pathname).toBe('/join');
  // });
});
