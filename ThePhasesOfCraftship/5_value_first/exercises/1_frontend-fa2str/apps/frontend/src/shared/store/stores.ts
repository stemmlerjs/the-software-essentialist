
import { PostsStore } from "@/modules/posts/repos/postsStore";
import { AuthStore } from "@/services/auth/auth/authStore";
import { makeAutoObservable } from "mobx";

export class Stores {
  constructor(
    public auth: AuthStore, // users, auth, member
    public posts: PostsStore
  ) {
    makeAutoObservable(this);
  }
} 