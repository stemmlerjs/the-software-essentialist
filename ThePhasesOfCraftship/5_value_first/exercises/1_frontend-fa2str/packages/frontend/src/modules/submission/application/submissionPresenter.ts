import { makeAutoObservable } from "mobx";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { AuthRepository } from "../../users/repos/authRepository";
import { PostsRepository } from "../../posts/repos/postsRepository";
import { PostDm } from "../../posts/domain/postDm";
import { Posts } from "@dddforum/shared/src/api";

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

  submit = async (data: Posts.CreatePostInput) => {
    try {
      if (!this.authRepository.isAuthenticated()) {
        this.navigationService.navigate('/join');
        return;
      }

      // Create the domain object here
      const createPostCommandOrError = Posts.createPostsAPI

      

      // If it has validation errors, return the error
      // Notice how this is exactly the same as the backend. In fact, many
      // of the domain objects could be reused across the front and the back
      // if we zoom out and organize the patterns adequately. (Pattern-First)
      // Input (presenter) -> to repo (command) -> to network -> to controller (command)
      // -> to Application (command) ->  to Aggregate action.
      // It's all content and structure. Encapsulation is critical.

      this.isSubmitting = true;
      this.error = null;

      await this.postsRepository.create({
        ...data,
        postType: 'text',
      });
      
      this.navigationService.navigate('/');
    } catch (error) {
      this.error = 'Failed to submit post';
    } finally {
      this.isSubmitting = false;
    }
  }
} 