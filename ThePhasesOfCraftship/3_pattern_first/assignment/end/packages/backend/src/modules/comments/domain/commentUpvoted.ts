
import { DomainEvent } from '@dddforum/shared/src/core/domainEvent';
import { randomUUID } from 'crypto';

export class CommentUpvoted extends DomainEvent {
  constructor(
    public readonly commentId: string,
    public readonly memberId: string,
    public readonly id: string = randomUUID(),
    public readonly date: Date = new Date()
  ) {
    super(id, date, 'CommentUpvoted');
  }
}
