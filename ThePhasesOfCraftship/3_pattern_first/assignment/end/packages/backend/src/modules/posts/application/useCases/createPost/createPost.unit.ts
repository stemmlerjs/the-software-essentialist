
import { PrismaClient } from "@prisma/client";
import { Member, MemberReputationLevel } from "../../../../members/domain/member";
import { CreatePost } from "./createPost";
import { ProductionMembersRepository } from "../../../../members/repos/adapters/productionMembersRepository";
import { ProductionPostsRepository } from "../../../repos/adapters/productionPostsRepository";
import { CreatePostCommand } from "../../../postsCommands";
import { MemberNotFoundError, PermissionError, ValidationError } from "@dddforum/shared/src/errors";
import { Post } from "../../../domain/post";
import { ProductionVotesRepository } from "../../../../comments/repos/adapters/productionCommentVotesRepository";
import { MemberUsername } from "../../../../members/domain/memberUsername";

function setupTest (useCase: CreatePost) {
  jest.resetAllMocks();

  let level2Member = Member.toDomain({
    userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
    username: MemberUsername.toDomain('jill'),
    reputationScore: 10,
    reputationLevel: MemberReputationLevel.Level2,
    id: 'bf6b4773-feea-44cd-a951-f0ffd68625ea'
  });

  useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(level2Member);

  return level2Member;
}

describe ('createPost', () => {

  let prisma = new PrismaClient();
  
  let membersRepo = new ProductionMembersRepository(prisma);
  let postsRepo = new ProductionPostsRepository(prisma);
  let votesRepo = new ProductionVotesRepository(prisma);
  
  const useCase = new CreatePost(postsRepo, membersRepo, votesRepo);

  describe('permissions & identity', () => {

    test('if the member was not found, they should not be able to create the post', async () => {

      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(null);
      const saveSpy = jest.spyOn(useCase['memberRepository'], 'save');

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: 'non-existent-id'
      });
      
      const response = await useCase.execute(command);
      
      expect(response instanceof MemberNotFoundError).toBe(true);
      expect((response as MemberNotFoundError).name).toEqual('MemberNotFoundError');
      expect(saveSpy).not.toHaveBeenCalled();
    });
  
    test('as a level 1 member, I should not be able to create a new post', async () => {

      // This is what takes us into double loop
      const level1Member = Member.create({
        userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
        username: 'jill'
      }) as Member

      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(level1Member);

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: level1Member.id
      });
      
      const response = await useCase.execute(command);
  
      expect(response instanceof PermissionError).toBe(true);
    });

    test('as a level 2 member, I should be able to create a new post', async () => {

      const level2Member = setupTest(useCase);

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: level2Member.id
      });
      
      const response = await useCase.execute(command);
  
      expect(response instanceof PermissionError).toBe(false);
      expect(response instanceof Post).toBe(true);
    });
  });

  describe('text posts', () => {
    test ('as a level 2 member, I should be able to create a new text post with valid post details', async () => {

      const level2Member = setupTest(useCase);
      const saveSpy = jest.spyOn(useCase['postRepository'], 'save');

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: level2Member.id
      });
      
      const response = await useCase.execute(command);

      expect(response instanceof Post).toBe(true);
      expect((response as Post).title).toEqual('A new post');
      expect(saveSpy).toHaveBeenCalled();
    });
  
    test.each([
      { title: '', content: '' },
      { title: 'A', content: 'sdsd' },
      { title: 'Title! Looks good. But no content.', content: '' },
      { title: 'Another', content: '2' }
    ])('as a level 2 member, I should not be able to create a text post with invalid title or content: %o', async ({ title, content }) => {

      const level2Member = setupTest(useCase);
      const saveSpy = jest.spyOn(useCase['postRepository'], 'save');

      const command = new CreatePostCommand({
        title,
        postType: 'text',
        content,
        memberId: level2Member.id
      });
      
      const response = await useCase.execute(command);

      expect(response instanceof ValidationError).toBe(true);
      expect(saveSpy).not.toHaveBeenCalled();
    });
  })

  describe('link posts', () => {
    test('as a level 2 member, I should be able to create a new link post with valid post details', async () => {

      const level2Member = setupTest(useCase);

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'link',
        link: 'https://www.google.com',
        memberId: level2Member.id
      });
      
      const response = await useCase.execute(command);

      expect(response instanceof Post).toBe(true);
      expect((response as Post).title).toEqual('A new post');
      expect((response as Post).link).toEqual('https://www.google.com');
    });

    test.each([
      { title: 'A new post', link: '' },
      { title: 'A new post', link: 'invalid-url' },
      { title: 'A new post', link: 'www.google.com' } // Assuming the link should be a full URL with http/https
    ])('as a level 2 member, I should not be able to create a link post with an invalid link: %o', async ({ title, link }) => {

      const level2Member = setupTest(useCase);
      const saveSpy = jest.spyOn(useCase['postRepository'], 'save');

      const command = new CreatePostCommand({
        title,
        postType: 'link',
        link,
        memberId: level2Member.id
      });
      
      const response = await useCase.execute(command);

      expect(response instanceof ValidationError).toBe(true);
      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  describe('default votes', () => {
    test('as a level 2 member, when creating a new post, the post should have 1 upvote by me', async () => {

      let postVoteSaveSpy = jest.spyOn(useCase['postRepository'], 'save').mockImplementation(async () => {});

      const level2Member = setupTest(useCase);

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'link',
        link: 'https://www.google.com',
        memberId: level2Member.id
      });
      
      const response = await useCase.execute(command);

      expect(response instanceof Post).toBe(true);
      const post = (response as Post);

      expect(post.title).toEqual('A new post');
      expect(post.link).toEqual('https://www.google.com');

      expect(postVoteSaveSpy).toHaveBeenCalledTimes(1);

      // expect(vote.isUpvote()).toEqual(true);
      // expect(vote.memberId).toEqual(level2Member.id);
    });
  })

})
