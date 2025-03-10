
import { PostsPresenter } from "./postsPresenter";
import { PostViewModel } from "./postViewModel";
import { FakePostsRepository } from "../repos/fakePostsRepository";
import { fakePostsData } from "../__tests__/fakePostsData";
import { fakeUserData } from "../../users/__tests__/fakeUserData";
import { SearchFilterViewModel } from "./searchFilterViewModel";
import { ProductionUsersRepository } from "../../users/repos/productionUsersRepo";
import { createAPIClient } from "@dddforum/shared/src/api";
import { LocalStorage } from "../../../shared/storage/localStorage";
import { FirebaseService } from "../../users/externalServices/firebaseService";

describe('PostsPresenter', () => {

  const mockedApi = createAPIClient('');
  const mockedLocalStorage = new LocalStorage();
  const mockedFirebase = new FirebaseService(); // TODO: use "mocked" for the name on all tests

  let loadedPostsVm: PostViewModel[] = [];
  let postsRepository = new FakePostsRepository(fakePostsData);
  let usersRepository = new ProductionUsersRepository(mockedApi, mockedLocalStorage, mockedFirebase);

  beforeEach(() => {
    // Todo: set this up
  })

  it ('can render a list of posts', async () => {
    

    let postsPresenter = new PostsPresenter(postsRepository, usersRepository);

    await postsPresenter.load((postsVm) => {
      loadedPostsVm = postsVm;
    });
    expect(loadedPostsVm).toHaveLength(3);

    let firstPost = loadedPostsVm[0];
    expect(firstPost.title).toEqual('This is my first post');
    expect(firstPost.dateCreated).toBeDefined();
    expect(firstPost.canCastVote).toEqual(false);
    expect(firstPost.voteScore).toEqual(4);
  });

  it ('can switch between popular posts and new posts', async () => {
    let loadedPostsVm: PostViewModel[] = [];
    let activeSearchFilter: SearchFilterViewModel = new SearchFilterViewModel('popular');

    let postsPresenter = new PostsPresenter(postsRepository, usersRepository);

    await postsPresenter.load((postsVm, searchFilterVm) => {
      loadedPostsVm = postsVm;
      activeSearchFilter = searchFilterVm;
    });
    expect(loadedPostsVm).toHaveLength(3);
    expect(activeSearchFilter.value).toEqual('popular');
    expect(loadedPostsVm[0].voteScore).toBeGreaterThanOrEqual(loadedPostsVm[1].voteScore);
    expect(loadedPostsVm[1].voteScore).toBeGreaterThanOrEqual(loadedPostsVm[2].voteScore);

    postsPresenter.switchSearchFilter('recent');

    await postsPresenter.load((postsVm, searchFilterVm) => {
      loadedPostsVm = postsVm;
      activeSearchFilter = searchFilterVm;
    });

    expect(loadedPostsVm).toHaveLength(3);
    expect(activeSearchFilter.value).toEqual('recent');
    expect(Date.parse(loadedPostsVm[0].dateCreated)).toBeGreaterThanOrEqual(Date.parse(loadedPostsVm[1].dateCreated));
    expect(Date.parse(loadedPostsVm[1].dateCreated)).toBeGreaterThanOrEqual(Date.parse(loadedPostsVm[2].dateCreated));
  });

  it ('does not let level 1 users cast votes', async () => {
    // TODO: implement the rest of these
    // Implement this
  });

  it('does let level 2 users cast votes', async () => {
    // TODO: implement the rest of these
    // Implement this
  });
})
