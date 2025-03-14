
import { fakeUserData } from '../users/__tests__/fakeUserData';
import { UsersRepository } from '../users/repos/usersRepo';
import { Users } from '@dddforum/api';
import { LayoutPresenter } from './layoutPresenter';
import { FakeNavigationRepository } from '../../shared/navigation/repos/fakeNavigationRepository';
import { NavigationRepository } from '../../shared/navigation/repos/navigationRepository';
import { ProductionUsersRepository } from '../users/repos/productionUsersRepo';
import { createAPIClient } from '@dddforum/api';
import { FakeAuthService } from '../users/externalServices/fakeAuthService';
import { MembersStore } from '../../shared/stores/members/membersStore';
import { UserLoginLayoutViewModel } from './userLoginLayoutVm';
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';


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
