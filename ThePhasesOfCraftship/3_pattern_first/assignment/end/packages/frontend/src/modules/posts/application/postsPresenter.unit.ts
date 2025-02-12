
import { PostsPresenter } from "./postsPresenter";
import { PostViewModel } from "./postViewModel";
import { FakePostsRepository } from "../repos/fakePostsRepository";
import { FakeUsersRepository } from "../../users/repos/fakeUsersRepo";
import { fakePostsData } from "../__tests__/fakePostsData";
import { fakeUserData } from "../../users/__tests__/fakeUserData";

describe('PostsPresenter', () => {

  it ('can render a list of posts', async () => {
    let loadedPostsVm: PostViewModel[] = [];
    let postsRepository = new FakePostsRepository(fakePostsData);
    let usersRepository = new FakeUsersRepository(fakeUserData);

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

  it ('can switch between popular posts and new posts', () => {
    
  });
})
