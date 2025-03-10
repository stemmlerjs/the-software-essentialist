
import { fakeUserData } from '../users/__tests__/fakeUserData';
import { UsersRepository } from '../users/repos/usersRepo';
import { UserDTO } from '@dddforum/shared/src/api/users';
import { LayoutPresenter } from './layoutPresenter';
import { FakeNavigationRepository } from '../../shared/navigation/repos/fakeNavigationRepository';
import { NavigationRepository } from '../../shared/navigation/repos/navigationRepository';
import { ProductionUsersRepository } from '../users/repos/productionUsersRepo';
import { createAPIClient } from '@dddforum/shared/src/api';
import { LocalStorage } from '../../shared/storage/localStorage';
import { FirebaseService } from '../users/externalServices/firebaseService';
import { MembersStore } from '../../shared/stores/members/membersStore';
import { UserLoginLayoutViewModel } from './userLoginLayoutVm';


describe('navLoginPresnter', () => {
  
  let usersRepository: UsersRepository;
  let navigationRepository: NavigationRepository;
  let presenter: LayoutPresenter;
  let loadedVm: UserLoginLayoutViewModel;

  const apiClient = createAPIClient('http://localhost:3000');
  const localStorage = new LocalStorage();
  const firebaseService = new FirebaseService();
  const membersRepository = new MembersStore(); // TODO: lots of organizing to do here.

  function setup (userDTO: UserDTO | null, currentRoute: string = "/") {

    usersRepository = new ProductionUsersRepository(apiClient, localStorage, firebaseService);
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
