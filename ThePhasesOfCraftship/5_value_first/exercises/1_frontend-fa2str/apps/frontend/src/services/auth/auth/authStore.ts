import { makeAutoObservable } from "mobx";
import { UserDm } from "@/modules/members/domain/userDm";
import { MemberDm } from "@/modules/members/domain/memberDm";
import { APIClient } from "@dddforum/api";
import { FirebaseAPI } from "@/modules/members/firebaseAPI";
import { LocalStorageAPI } from "@/shared/storage/localStorageAPI";

export class AuthStore {
  // Contains the user's auth details.
  user: UserDm;
  // Contains detials about the member
  member: MemberDm;

  constructor(
    private apiClient: APIClient,
    private firebaseAPI: FirebaseAPI,
    private localStorageAPI: LocalStorageAPI
  ) {
    makeAutoObservable(this);
  }
} 