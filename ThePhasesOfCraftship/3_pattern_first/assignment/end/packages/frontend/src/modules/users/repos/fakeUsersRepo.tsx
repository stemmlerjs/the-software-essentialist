import { makeAutoObservable } from "mobx";
import { UserDm } from "../domain/userDm";
import { UsersRepository } from "./usersRepo";
import { UserDTO } from "@dddforum/shared/src/api/users";

export class FakeUsersRepository implements UsersRepository {

  public currentUser: UserDm | null;

  constructor (userDTO: UserDTO | null) {
    makeAutoObservable(this);
    this.currentUser = userDTO ? UserDm.fromDTO(userDTO) : null
  }
  
  public async getCurrentUser () {
    return this.currentUser;
  }
}
