import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { EventBus } from "../../../shared/eventBus/ports/eventBus";
import { CommentUpvoted } from "../../comments/domain/commentUpvoted";

export class MemberSubscriptions {

  constructor (private eventBus: EventBus) {
    ;
  }

  setupSubscriptions () {
    this.eventBus.subscribe<CommentUpvoted>(CommentUpvoted.name, this.onCommentUpvoted.bind(this));
  }

  onCommentUpvoted(event: CommentUpvoted) {
    // Update the member's score
    // If the member is now above the level of a "trusted member", publish an event to signal to the system that the 
    // member's level has also changed as well. these are two things that we can test in our events.

  }

}
