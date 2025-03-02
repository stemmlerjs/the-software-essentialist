
import { UserLoginViewModel } from "./userLoginViewModel";
import { makeAutoObservable, observe } from "mobx";
import { UsersRepository } from "../repos/usersRepo";
import { MembersRepo } from "../../members/repos/membersRepo";

export class NavLoginPresenter {
  public userLogin: UserLoginViewModel | null;

  constructor(
    public usersRepository: UsersRepository,
    public membersRepository: MembersRepo
  ) {
    makeAutoObservable(this);
    this.setupSubscriptions();
    this.userLogin = null;
  }

  private setupSubscriptions () {
    observe(this.usersRepository, 'currentUser', (userDm) => {
      const member = this.membersRepository.member;
      this.userLogin = UserLoginViewModel.fromDomain(userDm.newValue, member);
      console.log('user repo changed')
    });

    observe(this.membersRepository,'member', (memberDm) => {
      const user = this.usersRepository.currentUser;
      this.userLogin = UserLoginViewModel.fromDomain(user, memberDm.newValue);

      console.log('member repo changed, new value', memberDm.newValue)
    });
  }

  async load(callback?: (userLogin: UserLoginViewModel) => void) {
    let user = await this.usersRepository.getCurrentUser();
    let member = await this.membersRepository.getCurrentMember();

    this.userLogin = UserLoginViewModel.fromDomain(user, member);

    callback && callback(this.userLogin);
  }

  async signOut () {
    
  }
}
