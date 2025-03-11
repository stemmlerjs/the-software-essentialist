import { APIClient, Users } from "@dddforum/api"
import { UserDm } from "../domain/userDm";
import { makeAutoObservable, toJS } from "mobx";
import { UsersRepository } from "./usersRepo";
import { LocalStorage } from "../../../shared/storage/localStorage";
import { FirebaseService } from "../externalServices/firebaseService";

export class ProductionUsersRepository implements UsersRepository {

  public api: APIClient;
  public currentUser: UserDm | null;

  constructor (
    api: APIClient, 
    private localStorage: LocalStorage, 
    private firebase: FirebaseService
  ) {
    makeAutoObservable(this);
    this.api = api;
    this.currentUser = null;
    this.loadInitialUserState(); // Just call it, don't await or use .then()
  }
  
  public save(user: UserDm): void {
    this.currentUser = user;
    if (user.isAuthenticated()) {
      this.localStorage.store('currentUser', user.toLocalStorage());
    }
  }

  private async loadInitialUserState(): Promise<void> {
    try {
      const rawUser = this.localStorage.retrieve('currentUser');
      const isAuthenticated = await this.firebase.isAuthenticated();
      
      if (rawUser && isAuthenticated) {
        const firebaseUser = await this.firebase.getCurrentUser();
        
        if (firebaseUser) {
          const user = UserDm.fromFirebaseUser(firebaseUser);
          this.localStorage.store('currentUser', user.toLocalStorage());
          this.currentUser = user;
          return;
        }
      }

      // If we get here, either there's no stored user, no Firebase user,
      // or authentication failed - clean up and set unauthenticated user
      this.localStorage.remove('currentUser');
      this.currentUser = new UserDm({ 
        isAuthenticated: false, 
        username: '', 
        userRoles: [] 
      });
      
    } catch (error) {
      // Handle any errors by setting unauthenticated user
      console.error('Error loading initial user state:', error);
      this.localStorage.remove('currentUser');
      this.currentUser = new UserDm({ 
        isAuthenticated: false, 
        username: '', 
        userRoles: [] 
      });
    }
  }

  async getCurrentUser(): Promise<UserDm | null> {
    // If the user is already loaded, just return it.
    console.log('current user', toJS(this.currentUser) )
    if (this.currentUser?.isAuthenticated()) return this.currentUser;

    // // If the user isn't already loaded, see if there's an auth token in cookie storage.
    // const tokenOrNothing = this.localStorage.getItem('authToken');

    // // If there's no auth token, return the user domain model as is. The user will have to re-authenticate.
    // if (!tokenOrNothing) return this.currentUser;
    
    // // If there's an auth token, use it to authenticate the user and populate the user domain model. 
    // const response = await this.api.users.refreshToken(tokenOrNothing);

    // // You will have to translate the DTO into a Domain Model.
    // this.currentUser = UserDm.fromRefreshTokenResponse(response);

    // If the auth fails, return the user domain model as is. The user will have to re-authenticate.
    return this.currentUser;
  }

  public register (registrationDetails: Users.CreateUserParams) {
    return this.api.users.register(registrationDetails);
  }
}
