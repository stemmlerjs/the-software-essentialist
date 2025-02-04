
import { RegistrationPresenter } from '../../../src/modules/registration/registrationPresenter';

describe('Registration', () => {
  it ('should be able to register a new user', async () => {});
  
  it ('should tell us when the form is invalid', async () => {
    let registrationPresenter = new RegistrationPresenter
    let userRegistrationDetails = {
      username: 'billybob',
      email: 'billybob@gmail.com',
      password: 'password123'
    }
    
    await registrationPresenter.register(userRegistrationDetails);
    expect(usersRepository.gateway.post).toHaveBeenCalledWith("/users", userRegistrationDetails);
  });

  it ('should be authenticated and redirected to the /dashboard page after successful registration', async () => {
    
    // should be on the dashboard page (via navigation)
    // should be authenticated (header presenter)
    // should have user details in the (header presenter)

    let userRegistrationDetails = {
      username: 'billybob',
      email: 'billybob@gmail.com',
      password: 'password123'
    }

    await registrationPresenter.register(userRegistrationDetails);
    expect(usersRepository.gateway.post).toHaveBeenCalledWith("/users", userRegistrationDetails);


    expect(headerNavigationViewModel.currentPage).toBe('dashboard');
    expect(headerNavigationViewModel.isAuthenticated).toBe(true);
    expect(headerNavigationViewModel.username).toBe(userRegistrationDetails.username);
  })
});
