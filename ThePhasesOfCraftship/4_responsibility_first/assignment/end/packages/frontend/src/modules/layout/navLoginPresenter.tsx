
import { UserLoginViewModel } from "../users/application/userLoginViewModel";
import { makeAutoObservable, observe, reaction } from "mobx";
import { UsersRepository } from "../users/repos/usersRepo";
import { MembersRepo } from "../../stores/members/membersRepo";

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
    reaction(
      () => this.usersRepository.currentUser,
      (userDm) => {
        const member = this.membersRepository.member;
        this.userLogin = UserLoginViewModel.fromDomain(userDm, member);
        console.log('user repo changed', this.userLogin);
      }
    )

    reaction(
      () => this.membersRepository.member,
      (memberDm) => {
        const user = this.usersRepository.currentUser;
        this.userLogin = UserLoginViewModel.fromDomain(user, memberDm);
  
        console.log('member repo changed, new value', memberDm)
      }
    )
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
