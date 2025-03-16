import { AuthStore } from "./authStore";

describe('authStore', () => {

  let store: AuthStore;
  let fakeIdToken = 'fake-id-token';

  describe('initialization', () => {

    test(`Successful re-authentication: Given the user has already been logged in therefore the token lives in local storage,
      Upon initialization, it should use the token to successfully re-authenticate the user using the token, 
      Then the user should be present in the store`, async () => {
        // Setup
        const localStorageSpy = jest.spyOn(store['localStorageAPI'], 'retrieve').mockImplementation(async () => fakeIdToken);

        // Act
        await store.initialize();

        // Assert
        expect(localStorageSpy).toHaveBeenCalledTimes(1);
        expect(store.isLoading).toBeFalsy();
        expect(store.currentUser).not.toBeNull();
        expect(store.getToken()).not.toBeNull();
        expect(store.isAuthenticated()).toBeTruthy();
    });

    test(`Failed re-authentication: Given the user has not already logged in therefore the token does not live in local storage,
      Upon initialization, it should attempt to authenticate and fail due to no token present,
      And the user should not be present in the store`, () => {
        const localStorageSpy = jest.spyOn(store['localStorageAPI'], 'retrieve').mockImplementation(async () => null);

        // Act
        await store.initialize();

        // Assert
        expect(store.isLoading).toBeFalsy();
        expect(store.currentUser).toBeNull();
        expect(store.getToken()).toBeNull();
        expect(store.isAuthenticated()).toBeFalsy();
    });
  });

  describe('Logging in', () => {

    test(`Successful login as an existing user that has not yet completed onboarding: 
      Given the previously user has not yet logged in and therefore an id token does not exist in local storage,
      When the user successfully authenticates with Google Auth,
      And we attempt to retrieve the user's member details from the client API
      Then we should have saved the user's id token to local storage for re-initialization
      And we should have stored the user's JWT to local storage so that we can make requests
      And the request for member details should have failed
      And there should now be a User Domain model present
      But there should not yet be a Member Domain model present`, () => {

    });

    test('Successful login as existing user that has completed onboarding', () => {

    })
  })
  
})