
import { EventBus } from "../../../shared/eventBus/ports/eventBus";
import { CommentUpvoted } from "../../comments/domain/commentUpvoted";
import { CommentDownvoted } from "../../comments/domain/commentDownvoted";
import { MemberService } from "./membersService";
import { UpdateMemberReputationScoreCommand } from "../memberCommands";

export class MemberSubscriptions {

  constructor (private eventBus: EventBus, private memberService: MemberService) {
    this.setupSubscriptions
  }

  setupSubscriptions () {
    this.eventBus.subscribe<CommentUpvoted>(CommentUpvoted.name, this.onCommentUpvoted.bind(this));
    this.eventBus.subscribe<CommentDownvoted>(CommentDownvoted.name, this.onCommentDownvoted.bind(this));
  }

  async onCommentUpvoted(event: CommentUpvoted) {
    try {
      const command = new UpdateMemberReputationScoreCommand({
        memberId: event.memberId
      });
      await this.memberService.updateMemberReputationScore(command)
    } catch (error) {
      // This is problematic because we are not handling the case this does not
      // succeed. We will discuss this in RDD-First.
    }
  }

  async onCommentDownvoted (event: CommentDownvoted) {
    try {
      const command = new UpdateMemberReputationScoreCommand({
        memberId: event.memberId
      });
      await this.memberService.updateMemberReputationScore(command)
    } catch (error) {
      // This is problematic because we are not handling the case this does not
      // succeed. We will discuss this in RDD-First.
    }
  }
}
