import { CommentUpvoted } from "../domain/commentUpvoted";

export class CommentsSubscriber {
  onCommentUpvoted(event: CommentUpvoted) {
    // Update the comment score
  }
}
