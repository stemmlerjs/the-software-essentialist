import { makeAutoObservable } from "mobx";

import { ApplicationErrors } from "@dddforum/errors/application";
import { Posts } from "@dddforum/api";
import { AuthStore } from "@/services/auth/authStore";
import { PostsStore } from "@/modules/posts/repos/postsStore";
import { NavigationService } from "@/modules/navigation/navigationService";

export class SubmissionPresenter {
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private authStore: AuthStore,
    private navigationService: NavigationService,
    private postsStore: PostsStore,
  ) {
    makeAutoObservable(this);
  }

  submit = async (input: { title: string; content: string; link?: string }) => {
    try {
      if (!this.authStore.isAuthenticated()) {
        this.navigationService.navigate('/join');
        return;
      }

      const member = await this.authStore.getCurrentMember();
      
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
      await this.postsStore.create(commandInput);
      
      this.navigationService.navigate('/');
    } catch (error) {
      this.error = 'Failed to submit post';
    } finally {
      this.isSubmitting = false;
    }
  }
} 