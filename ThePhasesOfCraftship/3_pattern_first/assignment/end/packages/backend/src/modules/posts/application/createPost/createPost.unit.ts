
import { CreatePostInput } from "@dddforum/shared/src/api/posts";
import { CreatePost } from "./createPost";
import { ProductionMembersRepository } from "../../../members/repos/adapters/productionMembersRepository";
import { ProductionPostsRepository } from "../../repos/adapters/productionPostsRepository";
import { MemberNotFoundError, PermissionError, ValidationError } from '@dddforum/shared/src/errors';
import { CreatePostCommand } from "../../postsCommands";
import { Post } from "../../domain/writeModels/post";
import { PrismaClient } from "@prisma/client";

describe ('createPost', () => {

  let prisma = new PrismaClient();
  
  let membersRepo = new ProductionMembersRepository(prisma);
  let postsRepo = new ProductionPostsRepository(prisma);
  
  const useCase = new CreatePost(postsRepo, membersRepo);

  describe('permissions & identity', () => {

    test('if the member was not found, they should not be able to create the post', async () => {

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: 'non-existent-id'
      });
      
      let response = await useCase.execute(command);
      
      expect(response instanceof MemberNotFoundError).toBe(true);
      expect((response as MemberNotFoundError).name).toEqual('MemberNotFoundError');
    });
  
    test('as a level 1 member, I should not be able to create a new post', async () => {

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: 'non-existent-id'
      });
      
      let response = await useCase.execute(command);
  
      expect(response instanceof PermissionError).toBe(true);
    });
  });

  describe('text posts', () => {
    test ('as a level 2 member, I should be able to create a new text post with valid post details', async () => {

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: 'non-existent-id'
      });
      
      let response = await useCase.execute(command);

      expect(response instanceof Post).toBe(true);
      expect((response as Post).title).toEqual('A new post');
    });
  
    test('as a level 2 member, I should not be able to create a text post without providing a valid title and text', async () => {
      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: 'non-existent-id'
      });
      
      let response = await useCase.execute(command);

      expect(response instanceof ValidationError).toBe(true);
    });
  })

  describe('link posts', () => {
    test('as a level 2 member, I should be able to create a new link post with valid post details', async () => {
      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'link',
        link: 'https://www.google.com',
        memberId: 'level-2-member-id'
      });
      
      let response = await useCase.execute(command);

      expect(response instanceof Post).toBe(true);
      expect((response as Post).title).toEqual('A new post');
      expect((response as Post).link).toEqual('https://www.google.com');
    });

    test ('as a level 2 member, I should not be able to create a new post with invalid post details', async () => {

      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'text',
        content: 'This is a new post',
        memberId: 'non-existent-id'
      });
      
      let response = await useCase.execute(command);

      expect(response instanceof ValidationError).toBe(true);
    });
  });

  describe('default votes', () => {
    test('as a level 2 member, when creating a new post, the post should have 1 upvote by me', async () => {
      const command = new CreatePostCommand({
        title: 'A new post',
        postType: 'link',
        link: 'https://www.google.com',
        memberId: 'level-2-member-id'
      });
      
      let response = await useCase.execute(command);

      expect(response instanceof Post).toBe(true);
      let post = (response as Post);
      let vote = post.votes.getFirst()

      expect(post.title).toEqual('A new post');
      expect(post.link).toEqual('https://www.google.com');
      expect(vote.isUpvote()).toEqual(true);
      expect(vote.memberId).toEqual('level-2-member-id');
    });
  })

})
