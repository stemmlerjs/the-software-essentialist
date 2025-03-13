
import { DomainEvent, DomainEventStatus } from '@dddforum/core';
import { EventModel } from '@dddforum/core'

interface CommentDownvotedEventProps {
  commentId: string;
  memberId: string;
}

export class CommentDownvoted extends DomainEvent {
  private constructor(
    props: CommentDownvotedEventProps,
    id?: string,
    retries?: number, 
    status?: DomainEventStatus,
    createdAt?: string
  ) {
    super('CommentDownvoted', props, props.commentId, id, retries, status, createdAt);
  }

  public static create (props: CommentDownvotedEventProps) {
    return new CommentDownvoted(props);
  }

  public static toDomain (eventModel: EventModel): CommentDownvoted {
    const serializedData = JSON.parse(eventModel.data) as CommentDownvotedEventProps

    // Validate this data here using zod or something

    return new CommentDownvoted(
      {
        commentId: serializedData.commentId,
        memberId: serializedData.memberId
      }, 
      eventModel.id, eventModel.retries, 
      eventModel.status as DomainEventStatus, 
      eventModel.dateCreated.toISOString()
    )
  }
}
