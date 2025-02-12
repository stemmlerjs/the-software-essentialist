

import { createAPIClient, Users } from '@dddforum/shared/src/api';
import { NavigationRepository } from '../../../src/modules/navigation/navigationRepository';
import { RegistrationPagePresenter } from '../../../src/modules/users/application/registrationPagePresenter';
import { UsersRepository } from '../../../src/modules/users/repos/productionUsersRepo';
import { HeaderNavigationViewModel } from '../../../src/modules/headerNav/headerNavViewModel';

describe('Registration', () => {

  jest.resetAllMocks();
  let apiClient = createAPIClient('http://localhost:3000');
  
  let usersRepository = new UsersRepository(apiClient);
  let navigationRepository = new NavigationRepository();
  let registrationPagePresenter = new RegistrationPagePresenter(
    usersRepository, 
    navigationRepository
  );
  let headerNavigationViewModel: HeaderNavigationViewModel;

  it ('should be authenticated and redirected to the /dashboard page after successful registration', async () => {

    // should be on the dashboard page (via navigation)
    // should be authenticated (header presenter)
    // should have user details in the (header presenter)

    let userRegistrationDetails: Users.CreateUserParams = {
      username: 'billybob',
      email: 'billybob@gmail.com',
      firstName: 'Billy',
      lastName: 'Bob'
    }

    jest.spyOn(registrationPagePresenter.usersRepository.api.users, 'register').mockImplementation(() => {
      return Promise.resolve({
        success: true,
        data: {
          id: 1,
          username: userRegistrationDetails.username,
          email: userRegistrationDetails.email,
          firstName: userRegistrationDetails.firstName,
          lastName: userRegistrationDetails.lastName
        }
      } as Users.CreateUserResponse);
    });

    await registrationPagePresenter.load((viewModels) => {
      headerNavigationViewModel = viewModels.headerNavigationViewModel
    });

    await registrationPagePresenter.register(userRegistrationDetails);
    expect(registrationPagePresenter.usersRepository.api.users.register).toHaveBeenCalledTimes(1);

    expect(headerNavigationViewModel.currentPage).toBe('dashboard');
    expect(headerNavigationViewModel.isAuthenticated).toBe(true);
    expect(headerNavigationViewModel.username).toBe(userRegistrationDetails.username);
  });
});












  // it ('should be able to register a new user', async () => {});
  
  // it ('should tell us when the form is invalid', async () => {
    
  //   let userRegistrationDetails: Users.CreateUserParams = {
  //     username: 'billybob',
  //     email: 'billybob@gmail.com',
  //     firstName: 'Billy',
  //     lastName: 'Bob'
  //   }
    
  //   await registrationPresenter.register(userRegistrationDetails);
  //   expect(usersRepository.gateway.users.register).toHaveBeenCalledWith(userRegistrationDetails);
  // });

