import { makeAutoObservable, observe } from "mobx";
import { PostViewModel } from "./postViewModel";
import { PostsRepository } from "../repos/postsRepository";
import { UsersRepository } from "../../users/repos/usersRepo";
import { FilterValue, SearchFilterViewModel } from "./searchFilterViewModel";

export class PostsPresenter {
  postVMs: PostViewModel[];
  searchFilter: SearchFilterViewModel;

  constructor (private postsRepository: PostsRepository, private usersRepository: UsersRepository) {
    makeAutoObservable(this);
    this.postVMs = [];
    this.searchFilter = new SearchFilterViewModel('popular');
    this.setupSubscriptions();
  }

  setupSubscriptions () {
    observe(this.usersRepository, 'currentUser', async (currentUser) => {
      const postDms = await this.postsRepository.getPosts();
      this.postVMs = postDms.map(postDm => PostViewModel.fromDomain(postDm, currentUser.newValue));
    });

    observe(this.postsRepository, 'postsDm', async (postDms) => {
      const currentUser = await this.usersRepository.getCurrentUser();
      this.postVMs = postDms.newValue.map(postDm => PostViewModel.fromDomain(postDm, currentUser));
    });

    observe(this, 'searchFilter', async (filter) => {
      const postDms = await this.postsRepository.getPosts(filter.newValue.value);
      const currentUser = await this.usersRepository.getCurrentUser();
      this.postVMs = postDms.map(postDm => PostViewModel.fromDomain(postDm, currentUser));
    })
  }

  async load (callback?: (posts: PostViewModel[], filter: SearchFilterViewModel) => void) {
    const postDms = await this.postsRepository.getPosts();
    const currentUser = await this.usersRepository.getCurrentUser();
    this.postVMs = postDms.map(postDm => PostViewModel.fromDomain(postDm, currentUser));
    callback && callback(this.postVMs, this.searchFilter);
  }

  switchSearchFilter (nextFilter: FilterValue) {
    this.searchFilter = new SearchFilterViewModel(nextFilter);
  }
}
