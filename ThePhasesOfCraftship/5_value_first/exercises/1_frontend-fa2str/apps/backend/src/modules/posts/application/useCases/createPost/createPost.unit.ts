
import { Member, MemberReputationLevel } from "../../../../members/domain/member";
import { CreatePost } from "./createPost";
import { ProductionMembersRepository } from "../../../../members/repos/adapters/productionMembersRepository";
import { ProductionPostsRepository } from "../../../repos/adapters/productionPostsRepository";
import { Post } from "../../../domain/post";
import { MemberUsername } from "../../../../members/domain/memberUsername";
import { EventOutboxTable } from "@dddforum/outbox";
import { Commands } from "@dddforum/api/posts"
import { PrismaDatabase } from "@dddforum/database";
import { Config } from "@dddforum/config";

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

  let config = Config();
  let database = new PrismaDatabase(config);
  let outboxTable = new EventOutboxTable(database);
  let membersRepo = new ProductionMembersRepository(database, outboxTable);
  let postsRepo = new ProductionPostsRepository(database, outboxTable);
  
  const useCase = new CreatePost(postsRepo, membersRepo);

  describe('permissions & identity', () => {

    test('if the member was not found, they should not be able to create the post', async () => {

      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(null);
      const saveSpy = jest.spyOn(useCase['memberRepository'], 'save').mockImplementation(async () => {});

      const commandOrError = Commands.CreatePostCommand.create({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: 'non-existent-id'
      });
      
      expect(commandOrError.isSuccess()).toBeTruthy();
      
      const response = await useCase.execute(commandOrError.getValue());

      expect(response.isSuccess()).toBe(false);
      expect(response.getError().type === 'NotFoundError').toBe(true);
      // TODO: also signal that it was a member not found
      expect(saveSpy).not.toHaveBeenCalled();
    });
  
    test('as a level 1 member, I should not be able to create a new post', async () => {

      const level1Member = Member.toDomain({
        userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
        username: MemberUsername.toDomain('jill'),
        reputationScore: 0,
        reputationLevel: MemberReputationLevel.Level1,
        id: 'bf6b4773-feea-44cd-a951-f0ffd68625ea'
      });

      useCase['memberRepository'].getMemberById = jest.fn().mockResolvedValue(level1Member);

      const commandOrError = Commands.CreatePostCommand.create({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: level1Member.id
      });
      
      expect(commandOrError.isSuccess()).toBeTruthy();
      
      const response = await useCase.execute(commandOrError.getValue());
  
      expect(response.isSuccess()).toBe(false);
      expect(response.getError().type === 'PermissionError').toBe(true);
    });

    test('as a level 2 member, I should be able to create a new post', async () => {

      const level2Member = setupTest(useCase);
      const saveSpy = jest.spyOn(useCase['postRepository'], 'save').mockImplementation(async () => {});

      const commandOrError = Commands.CreatePostCommand.create({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: level2Member.id
      });
      
      expect(commandOrError.isSuccess()).toBeTruthy();
      
      const response = await useCase.execute(commandOrError.getValue());
  
      expect(response.isSuccess()).toBe(true);
      expect(response.getValue() instanceof Post).toBe(true);
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe('text posts', () => {
    test ('as a level 2 member, I should be able to create a new text post with valid post details', async () => {

      const level2Member = setupTest(useCase);
      const saveSpy = jest.spyOn(useCase['postRepository'], 'save').mockImplementation(async () => {});

      const commandOrError = Commands.CreatePostCommand.create({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: level2Member.id
      });

      expect(commandOrError.isSuccess()).toBeTruthy();
      
      const response = await useCase.execute(commandOrError.getValue());

      expect(response.isSuccess()).toBe(true);
      expect(response.getValue() instanceof Post).toBe(true);
      expect((response.getValue()).title).toEqual('A new post');
      expect(saveSpy).toHaveBeenCalled();
    });
  
    test.each([
      { title: '', content: '' },
      { title: 'A', content: 'sdsd' },
      { title: 'Title! Looks good. But no content.', content: '' },
      { title: 'Another', content: '2' }
    ])('as a level 2 member, I should not be able to create a text post with invalid title or content: %o', async ({ title, content }) => {

      const level2Member = setupTest(useCase);

      const commandOrError = Commands.CreatePostCommand.create({
        title,
        postType: 'text',
        content,
        memberId: level2Member.id
      });

      expect(commandOrError.isSuccess()).toBeFalsy();
    });
  })

  describe('link posts', () => {
    test('as a level 2 member, I should be able to create a new link post with valid post details', async () => {

      const level2Member = setupTest(useCase);

      const commandOrError = Commands.CreatePostCommand.create({
        title: 'A new post',
        postType: 'link',
        link: 'https://www.google.com',
        memberId: level2Member.id
      });

      expect(commandOrError.isSuccess()).toBeTruthy();
      
      const response = await useCase.execute(commandOrError.getValue());

      expect(response.isSuccess()).toBe(true);
      expect(response.getValue() instanceof Post).toBe(true);
      expect((response.getValue()).title).toEqual('A new post');
      expect((response.getValue()).link).toEqual('https://www.google.com');
    });

    test.each([
      { title: 'A new post', link: '' },
      { title: 'A new post', link: 'invalid-url' },
      { title: 'A new post', link: 'www.google.com' } // Assuming the link should be a full URL with http/https
    ])('as a level 2 member, I should not be able to create a link post with an invalid link: %o', async ({ title, link }) => {

      const level2Member = setupTest(useCase);

      const commandOrError = Commands.CreatePostCommand.create({
        title,
        postType: 'link',
        link,
        memberId: level2Member.id
      });
      
      expect(commandOrError.isSuccess()).toBeFalsy();
    });
  });

  describe('default votes', () => {
    test('as a level 2 member, when creating a new post, the post should have 1 upvote by me', async () => {

      let postVoteSaveSpy = jest.spyOn(useCase['postRepository'], 'save').mockImplementation(async () => {});

      const level2Member = setupTest(useCase);

      const commandOrError = Commands.CreatePostCommand.create({
        title: 'A new post',
        postType: 'link',
        link: 'https://www.google.com',
        memberId: level2Member.id
      });

      expect(commandOrError.isSuccess()).toBeTruthy();
      
      const response = await useCase.execute(commandOrError.getValue() as Commands.CreatePostCommand);

      expect(response.isSuccess()).toBe(true);
      const post = response.getValue() ;

      expect(post.title).toEqual('A new post');
      expect(post.link).toEqual('https://www.google.com');

      expect(postVoteSaveSpy).toHaveBeenCalledTimes(1);
    });
  })

})
