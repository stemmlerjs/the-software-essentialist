import { makeAutoObservable } from "mobx";
import { FirebaseService } from "../../../modules/users/externalServices/firebaseService";
import { UsersRepository } from "../../../modules/users/repos/usersRepo";

export class AuthStore {
  constructor(
    private usersRepository: UsersRepository,  // Rename parameter
    private firebaseService: FirebaseService
  ) {
    makeAutoObservable(this);
  }

  get currentUser() {
    return this.usersRepository.currentUser;  // Update reference
  }

  get isLoading() {
    return this.usersRepository.isLoading;  // Update reference
  }

  // ... other methods ...
} 