import { makeAutoObservable } from "mobx";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { AuthRepository } from "../../users/repos/authRepository";
import { PostsRepository } from "../../posts/repos/postsRepository";

import { ApplicationErrors } from "@dddforum/errors/application";
import * as Posts from "@dddforum/api/posts";
import { MembersRepo } from "../../../shared/stores/members/membersRepo";

export class SubmissionPresenter {
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private authRepository: AuthRepository,
    private navigationService: NavigationService,
    private postsRepository: PostsRepository,
    private memberRepo: MembersRepo
  ) {
    makeAutoObservable(this);
  }

  submit = async (input: { title: string; content: string; link?: string }) => {
    try {
      if (!this.authRepository.isAuthenticated()) {
        this.navigationService.navigate('/join');
        return;
      }

      const member = await this.memberRepo.getCurrentMember();
      
      if (!member) {
        this.error = 'Not authenticated';
        return;
      }

      const commandInput: Posts.Inputs.CreatePostInput = {
        title: input.title,
        content: input.content,
        postType: input.link ? 'link' : 'text',
        memberId: member.id,
        link: input.link
      };

      // Validate the creation of the command right here
      const commandOrError = Posts.Commands.CreatePostCommand.create(commandInput);

      if (commandOrError instanceof ApplicationErrors.ValidationError) {
        this.error = commandOrError.message;
        return;
      }

      this.isSubmitting = true;
      this.error = null;

      // Use the validated commandInput instead of raw input
      await this.postsRepository.create(commandInput);
      
      this.navigationService.navigate('/');
    } catch (error) {
      this.error = 'Failed to submit post';
    } finally {
      this.isSubmitting = false;
    }
  }
} 