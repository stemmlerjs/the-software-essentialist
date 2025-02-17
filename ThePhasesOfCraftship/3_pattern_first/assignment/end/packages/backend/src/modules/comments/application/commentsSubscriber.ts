import { CommentUpvoted } from "../domain/commentUpvoted";

export class CommentsSubscriber {
  onCommentUpvoted(event: CommentUpvoted) {
    // We can update the comment score here by calling into an application service method
    // such as refreshCommentScore(commentId: string) which will recalculate the score
    // based on the votes and update the comment in the database.
  }

  onCommentDownvoted(event: CommentUpvoted) {
    
  }
}
