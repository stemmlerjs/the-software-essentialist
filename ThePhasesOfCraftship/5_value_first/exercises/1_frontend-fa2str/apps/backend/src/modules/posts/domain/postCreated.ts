import { DomainEvent, DomainEventStatus } from '@dddforum/shared/src/core/domainEvent';
import { Event as EventModel } from '@prisma/client'

interface PostCreatedEventProps {
  postId: string;
  memberId: string;
}

export class PostCreated extends DomainEvent {
  private constructor(
    props: PostCreatedEventProps,
    id?: string,
    retries?: number, 
    status?: DomainEventStatus,
    createdAt?: string
  ) {
    super('PostCreated', props, props.postId, id, retries, status, createdAt);
  }

  public static create (props: PostCreatedEventProps) {
    return new PostCreated(props);
  }

  public static toDomain (eventModel: EventModel): PostCreated {
    const serializedData = JSON.parse(eventModel.data) as PostCreatedEventProps

    // Validate this data here using zod or something

    return new PostCreated(
      {
        postId: serializedData.postId,
        memberId: serializedData.memberId
      }, 
      eventModel.id, eventModel.retries, 
      eventModel.status as DomainEventStatus, 
      eventModel.dateCreated.toISOString()
    )
  }
}
