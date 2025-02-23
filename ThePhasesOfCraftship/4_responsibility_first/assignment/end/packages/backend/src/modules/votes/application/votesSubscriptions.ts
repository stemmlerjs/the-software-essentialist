
import { CommentUpvoted } from "../../comments/domain/commentUpvoted";
import { CommentDownvoted } from "../../comments/domain/commentDownvoted";
import { UpdateMemberReputationScoreCommand, VoteOnPostCommand } from "../votesCommands";
import { VotesService } from "./votesService";
import { PostCreated } from "../../posts/domain/postCreated";
import { EventBus } from "../../../shared/events/ports/eventBus";

export class VotesSubscriptions {

  constructor (private eventBus: EventBus, private voteService: VotesService) {
    this.setupSubscriptions();
  }

  setupSubscriptions () {
    this.eventBus.subscribe<CommentUpvoted>(CommentUpvoted.name, this.onCommentUpvotedUpdateReputationScore.bind(this));
    this.eventBus.subscribe<CommentDownvoted>(CommentDownvoted.name, this.onCommentDownvotedUpdateReputationScore.bind(this));
    this.eventBus.subscribe<PostCreated>(PostCreated.name, this.onPostCreatedCastInitialUpvote.bind(this));
  }

  async onPostCreatedCastInitialUpvote (event: PostCreated) {
    try {
      console.log('casting initial vote on post')
      const command = new VoteOnPostCommand({
        postId: event.postId,
        voteType: 'upvote',
        memberId: event.memberId
      });
      await this.voteService.castVoteOnPost(command);
    } catch (error) {
      console.log(error);
      // Handle
    }
  }

  async onCommentUpvotedUpdateReputationScore(event: CommentUpvoted) {
    try {
      const command = new UpdateMemberReputationScoreCommand({
        memberId: event.memberId
      });
      await this.voteService.updateMemberReputationScore(command)
    } catch (error) {
      console.log(error);
      // Handle
    }
  }

  async onCommentDownvotedUpdateReputationScore (event: CommentDownvoted) {
    try {
      const command = new UpdateMemberReputationScoreCommand({
        memberId: event.memberId
      });
      await this.voteService.updateMemberReputationScore(command)
    } catch (error) {
      console.log(error);
      // Handle
    }
  }
}
