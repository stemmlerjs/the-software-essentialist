
import { makeAutoObservable, observe } from "mobx";
import { PostViewModel } from "./postViewModel";
import { PostsRepository } from "../repos/postsRepository";
import { PostsFilterValue, SearchFilterViewModel } from "./searchFilterViewModel";
import { Posts } from "@dddforum/api";
import { AuthStore } from "@/services/auth/auth/authStore";

export class PostsPresenter {
  postVMs: PostViewModel[];
  searchFilter: SearchFilterViewModel;

  constructor (private postsStore: PostsRepository, private authStore: AuthStore) {
    makeAutoObservable(this);
    this.postVMs = [];
    this.searchFilter = new SearchFilterViewModel('popular');
    this.setupSubscriptions();
  }

  setupSubscriptions () {
    observe(this.authStore, 'currentUser', async (currentUser) => {
      const postDms = await this.postsStore.getPosts();
      this.postVMs = postDms.map(postDm => PostViewModel.fromDomain(postDm, currentUser.newValue));
    });

    observe(this.postsStore, 'postsDm', async (postDms) => {
      const currentUser = await this.authStore.getCurrentUser();
      this.postVMs = postDms.newValue.map(postDm => PostViewModel.fromDomain(postDm, currentUser));
    });

    observe(this, 'searchFilter', async (filter) => {
      const query = Posts.Queries.GetPostsQuery.create(filter.newValue.value)
      const postDms = await this.postsStore.getPosts(query);
      const currentUser = await this.authStore.getCurrentUser();
      this.postVMs = postDms.map(postDm => PostViewModel.fromDomain(postDm, currentUser));
    })
  }

  async load (callback?: (posts: PostViewModel[], filter: SearchFilterViewModel) => void) {
    const postDms = await this.postsStore.getPosts();
    const currentUser = await this.authStore.getCurrentUser();
    this.postVMs = postDms.map(postDm => PostViewModel.fromDomain(postDm, currentUser));
    callback && callback(this.postVMs, this.searchFilter);
  }

  switchSearchFilter (nextFilter: PostsFilterValue) {
    this.searchFilter = new SearchFilterViewModel(nextFilter);
  }
}
