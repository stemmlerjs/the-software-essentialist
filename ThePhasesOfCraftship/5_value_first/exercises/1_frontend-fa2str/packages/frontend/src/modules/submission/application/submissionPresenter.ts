import { makeAutoObservable } from "mobx";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { AuthRepository } from "../../users/repos/authRepository";
import { PostsRepository } from "../../posts/repos/postsRepository";
import { Posts } from "@dddforum/shared/src/api";
import { ApplicationErrors } from "@dddforum/shared/src/errors";

export class SubmissionPresenter {
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private authRepository: AuthRepository,
    private navigationService: NavigationService,
    private postsRepository: PostsRepository
  ) {
    makeAutoObservable(this);
  }

  submit = async (data: Posts.Commands.CreatePostInput) => {
    try {
      if (!this.authRepository.isAuthenticated()) {
        this.navigationService.navigate('/join');
        return;
      }

      // Validate the creation of the command right here
      const commandOrError = Posts.Commands.CreatePostsCommand.create(data);

      // TODO: Improve this by just using isSuccess() and .getError()
      if (commandOrError instanceof ApplicationErrors.ValidationError) {
        // Present the error
        this.error = commandOrError.message;
        return;
      }
      
      // If it has validation errors, return the error
      // Notice how this is exactly the same as the backend. In fact, many
      // of the domain objects could be reused across the front and the back
      // if we zoom out and organize the patterns adequately. (Pattern-First)
      // Input (presenter) -> to repo (command) -> to network -> to controller (command)
      // -> to Application (command) ->  to Aggregate action.
      // It's all content and structure. Encapsulation is critical.

      this.isSubmitting = true;
      this.error = null;

      await this.postsRepository.create(commandOrError);
      
      this.navigationService.navigate('/');
    } catch (error) {
      this.error = 'Failed to submit post';
    } finally {
      this.isSubmitting = false;
    }
  }
} 