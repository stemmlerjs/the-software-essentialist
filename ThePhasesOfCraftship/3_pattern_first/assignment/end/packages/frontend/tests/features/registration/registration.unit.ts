

import { createAPIClient, Users } from '@dddforum/shared/src/api';
import { RegistrationPresenter } from '../../../src/modules/registration/registrationPresenter';
import { UsersRepository } from '../../../src/modules/usersRepository';
import { HeaderNavigationViewModel } from '../../../src/modules/headerNavigationViewModel'

describe('Registration', () => {

  jest.resetAllMocks();
  let apiClient = createAPIClient('http://localhost:3000');
  
  let usersRepository = new UsersRepository(apiClient);
  let registrationPresenter = new RegistrationPresenter(usersRepository);
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

    apiClient.users.register = jest.fn().mockImplementation(() => {
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

    await registrationPresenter.load((viewModels) => {
      headerNavigationViewModel = viewModels.headerNavigationViewModel
    });

    await registrationPresenter.register(userRegistrationDetails);
    expect(apiClient.users.register).toHaveBeenCalledWith(userRegistrationDetails);

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

