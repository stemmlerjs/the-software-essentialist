import { EventHandler } from '@dddforum/shared/src/core/eventHandler';
import { CommentUpvoted } from "../../../comments/domain/commentUpvoted";

export class OnCommentUpvoted implements EventHandler<CommentUpvoted> {

  public async handle (event: CommentUpvoted) {

  }
}
