import { makeAutoObservable } from "mobx";
import { UserDm } from "../domain/userDm";
import { UsersRepository } from "./usersRepo";
import { UserDTO } from "@dddforum/shared/src/api/users";

export class FakeUsersRepository implements UsersRepository {

  public currentUser: UserDm;

  constructor (userDTO: UserDTO) {
    makeAutoObservable(this);
    this.currentUser = UserDm.fromDTO(userDTO);
  }
  
  public async getCurrentUser () {
    return this.currentUser;
  }
}
