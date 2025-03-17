
import { Users } from '@dddforum/api';
import { LayoutPresenter } from './layoutPresenter';
import { createAPIClient } from '@dddforum/api';
import { UserLoginLayoutViewModel } from './userLoginLayoutVm';
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';
import { AuthStore } from '@/services/auth/authStore';
import { FirebaseAPI } from '@/modules/members/firebaseAPI';
import { FakeFirebaseAPI } from '@/modules/members/fakeFirebaseAPI';
import { fakeUserData } from '@/modules/members/__tests__/fakeUserData';


describe('navLoginPresnter', () => {
  
  let presenter: LayoutPresenter;
  let loadedVm: UserLoginLayoutViewModel;

  let fakeLocalStorage: FakeLocalStorage
  let mockedApi = createAPIClient('');
  let fakeFirebaseAPI: FirebaseAPI;
  let authStore: AuthStore;

  function setup (userDTO: Users.UserDTO | null, currentRoute: string = "/") {
    fakeLocalStorage = new FakeLocalStorage();
    fakeFirebaseAPI = new FakeFirebaseAPI();
    authStore = new AuthStore(mockedApi, fakeFirebaseAPI, fakeLocalStorage);
    presenter = new LayoutPresenter(
      authStore
    );
  }

  it ('should render the username if the user is logged in', async () => {
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
