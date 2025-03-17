import { PostsStore } from "@/modules/posts/repos/postsStore";
import { AuthStore } from "@/services/auth/auth/authStore";
import { NavigationStore } from "@/services/navigation/navigationStore";
import { makeAutoObservable } from "mobx";

export class Stores {
  constructor(
    public auth: AuthStore, // users, auth, member
    public posts: PostsStore,
    public navigation: NavigationStore
  ) {
    makeAutoObservable(this);
  }
} 