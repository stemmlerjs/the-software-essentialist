
import { CommentUpvoted } from "../../comments/domain/commentUpvoted";
import { CommentDownvoted } from "../../comments/domain/commentDownvoted";
import { VotesService } from "./votesService";
import { PostCreated } from "../../posts/domain/postCreated";
import { EventBus } from "@dddforum/bus";
import { PostUpvoted } from "../../posts/domain/postUpvoted";
import { PostDownvoted } from "../../posts/domain/postDownvoted";
import { Commands } from "@dddforum/api/votes";

export class VotesSubscriptions {

  constructor (
    private eventBus: EventBus, 
    private voteService: VotesService
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions () {
    this.eventBus.subscribe<CommentUpvoted>(CommentUpvoted.name, this.onCommentUpvotedUpdateReputationScore.bind(this));
    this.eventBus.subscribe<CommentDownvoted>(CommentDownvoted.name, this.onCommentDownvotedUpdateReputationScore.bind(this));
    this.eventBus.subscribe<PostUpvoted>(PostUpvoted.name, this.onPostUpvotedUpdateReputationScore.bind(this));
    this.eventBus.subscribe<PostDownvoted>(PostDownvoted.name, this.onPostDownvotedUpdateReputationScore.bind(this));
    this.eventBus.subscribe<PostCreated>(PostCreated.name, this.onPostCreatedCastInitialUpvote.bind(this));
  }

  async onPostCreatedCastInitialUpvote (event: PostCreated) {
    try {
      const command = new Commands.VoteOnPostCommand({
        postId: event.data.postId,
        voteType: 'upvote',
        memberId: event.data.memberId
      });
      await this.voteService.castVoteOnPost(command);
    } catch (error) {
      console.log(error);
      // Handle
    }
  }

  async onPostUpvotedUpdateReputationScore(event: PostUpvoted) {
    try {
      const command = new Commands.UpdateMemberReputationScoreCommand({
        memberId: event.data.memberId
      });
      await this.voteService.updateMemberReputationScore(command)
    } catch (error) {
      console.log(error);
      // Handle
    }
  }

  async onPostDownvotedUpdateReputationScore(event: PostDownvoted) {
    try {
      const command = new Commands.UpdateMemberReputationScoreCommand({
        memberId: event.data.memberId
      });
      await this.voteService.updateMemberReputationScore(command)
    } catch (error) {
      console.log(error);
      // Handle
    }
  }

  async onCommentUpvotedUpdateReputationScore(event: CommentUpvoted) {
    try {
      const command = new Commands.UpdateMemberReputationScoreCommand({
        memberId: event.data.memberId
      });
      await this.voteService.updateMemberReputationScore(command)
    } catch (error) {
      console.log(error);
      // Handle
    }
  }

  async onCommentDownvotedUpdateReputationScore (event: CommentDownvoted) {
    try {
      const command = new Commands.UpdateMemberReputationScoreCommand({
        memberId: event.data.memberId
      });
      await this.voteService.updateMemberReputationScore(command)
    } catch (error) {
      console.log(error);
      // Handle
    }
  }
}
