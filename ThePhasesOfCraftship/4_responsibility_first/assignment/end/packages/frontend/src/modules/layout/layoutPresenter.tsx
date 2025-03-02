
import { UserLoginViewModel } from "./userLoginViewModel";
import { makeAutoObservable, reaction } from "mobx";
import { UsersRepository } from "../users/repos/usersRepo";
import { MembersStore } from "../../stores/members/membersStore";

export class LayoutPresenter {
  // Declare a view model. This is what the component will use to 
  // render properly. Keep this as flat as possible.
  public userLogin: UserLoginViewModel | null;

  constructor(
    // Here we have 'stores' or 'repos'. At the end of the day, they are the 
    // same thing. They are objects which store and return 'domain models' for us.
    // These objects can act similarly to that of repositories in a DDD context, because they
    // abstract the complexity of how we fetch/retrieve these objects. Perhaps they use local storage,
    // perhaps they use APIs. Perhaps both. Doesn't matter to the presenter. What is important
    // is that repositories expose the domain objects we need in order to construct the 
    // view models (see 'setupSubscriptions' below).
    public usersRepository: UsersRepository,
    public membersRepository: MembersStore
  ) {
    // Always make this presenter observable so that the component can subscribe to
    // the view model changes (see the load pattern we use).
    makeAutoObservable(this);
    // In the constructor, we also always do these 3 things. make auto observable, 
    // setup subscriptions, and initialize the view model with null.
    this.setupSubscriptions();
    this.userLogin = null;
  }

  // What is a subscription? A subscription is how we create the view model.
  // Basically this is 'subscribeToDomainModelChangesToRebuildViewModel'. That's
  // what we're doing here. It's a chain.
  private setupSubscriptions () {
    reaction(
      () => ({
        user: this.usersRepository.currentUser,
        member: this.membersRepository.member,
      }),
      ({ user, member }) => {
        // When any of these properties of the store/repos (domain models) changes,
        // that's when it's time for us to re-create the view model.
        // Again, as soon as this happens, because the component subscribes to the
        // view model within the presenter with 'useEffect', that's what will trigger
        // the re-render.
        const newUserLogin = UserLoginViewModel.fromDomain(user, member);
        // Only update if the value has changed
        // Note: we may need to introduce a 'compareTo' on these view models.
        // That would make for a good base class.
        if (this.userLogin !== newUserLogin) {
          this.userLogin = newUserLogin;
        }
      }
    );
  }

  // This is the last part 
  async load(callback?: (userLogin: UserLoginViewModel) => void) {
    if (this.userLogin === null) {
      let user = await this.usersRepository.getCurrentUser();
      let member = await this.membersRepository.getCurrentMember();

      console.log('new userlogin', UserLoginViewModel.fromDomain(user, member))
      this.userLogin = UserLoginViewModel.fromDomain(user, member);
    }

    // Why do we return via callback and via promise? This is a conventional presenter
    // pattern that we use to make presenters accessible regardless of the view layer
    // library and regardless of the context (ie: we may be running production code, or
    // we may be writing a test). This pattern allows us to handle both and to synchronize
    // the way that we do them so that we can use TDD to drive our implementations.
    callback && callback(this.userLogin);
    return this.userLogin;
  }

  // Finally, because presenters are effectively Application Level 3 abstractions,
  // they can also perform application logic for us, acting similarly to that of use
  // cases on the backend. If all of the other methods you've seen so far are "convention",
  // these are the Use Case methods. These are the vertical slices. Everything else is
  // just convention to get things working.
  async signOut () {
    
  }
}
