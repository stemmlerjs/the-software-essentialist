
import { Member, MemberReputationLevel } from "@dddforum/backend/src/modules/members/domain/member";
import { APIClient } from "@dddforum/shared/src/api";
import { CreatePostInput } from "@dddforum/shared/src/api/posts";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { setupMember } from "./members";
import { Post } from "@dddforum/backend/src/modules/posts/domain/post";
import { PostVote } from "@dddforum/backend/src/modules/posts/domain/postVote";
import { ValidationError } from "@dddforum/shared/src/errors";

export async function setupPost (apiClient: APIClient, member: Member, authToken: string) {
  let postData: CreatePostInput = {
    memberId: member.id,
    title: 'A new post',
    postType: "text",
    content: 'This is a new text post that I am creating!'
  };
  let response = await apiClient.posts.create(postData, authToken);

  expect(response).toBeDefined();
  expect(response.success).toBe(true);
  return { post: response.data };
}

// TODO: Refine this to be consistent (reason it exists: time constraint) - remove other setupPost function
async function _setupPost (fixture: DatabaseFixture, member: Member) {
  const postOrError: unknown = Post.create({
    memberId: member.id,
    title: 'A new post',
    postType: "text",
    content: 'This is a new text post that I am creating!'
  })
  if (postOrError instanceof ValidationError) {
    throw new Error('validation error creating post')
  }
  const validatedPost = postOrError as Post;
  await fixture.setupWithExistingPosts([validatedPost]);
  return { post: validatedPost };
}

async function setupVotesOnPost (fixture: DatabaseFixture, { post, upvoteCount }: { post: Post, upvoteCount: number }) {
  let memberList: Member[] = [];
  for (let i = 0; i < upvoteCount; i++) {
    let { member } = await setupMember(fixture, MemberReputationLevel.Level2);
    memberList.push(member);
  }

  const votes: PostVote[] = memberList.map((member) => {
    const postVote = PostVote.create(member.id, post.id) as PostVote;
    postVote.castVote('upvote');
    return postVote;
  })

  await fixture.setupWithExistingPostVotes(votes);
}

export async function setupLevel2MemberWithUpvotedPost ({ fixture, upvoteCount }: { fixture: DatabaseFixture, upvoteCount: number }) {
  // TODO: Enforce consistent structure of these fixture functions
  let { member } = await setupMember(fixture, MemberReputationLevel.Level2);
  let { post } = await _setupPost(fixture, member);
  await setupVotesOnPost(fixture, { post, upvoteCount });

  // TODO: Assert that the post has the correct number of votes
  const count = await fixture['composition'].getDatabase().getConnection().postVote.count({ where: { postId: post.id, value: 1 } })
  console.log('count!', count);
  
  // TODO: Assert that the member is level 2
  // TODO: Assert that the current member score of this member is correct based on the votes
  
  return { member, post };
}
