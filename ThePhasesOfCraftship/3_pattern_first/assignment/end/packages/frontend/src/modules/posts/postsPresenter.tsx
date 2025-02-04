import { makeAutoObservable, observe } from "mobx";
import { PostsRepository } from "./postsRepository";
import { PostViewModel } from "./postViewModel";

export class PostsPresenter {
  postVMs: PostViewModel[];

  constructor (private postsRepository: PostsRepository) {
    makeAutoObservable(this);
    this.postVMs = [];
    this.setupSubscriptions();
  }

  setupSubscriptions () {
    observe(this.postsRepository, 'posts', (postDms) => {
      this.postVMs = postDms.newValue.map(postDm => PostViewModel.fromDomain(postDm));
    });
  }

  async load (callback?: any) {
    this.postsRepository.getPosts();
    
    callback && callback({
      posts: this.postVMs,
    });
  }
}
