
import { DomainEvent, DomainEventStatus } from "@dddforum/core";
import { MemberReputationLevel } from "./member";
import { Event as EventModel } from '@dddforum/database'
import { Types } from '@dddforum/api/members'

interface MemberReputationLevelUpgradedEventProps {
  memberId: string;
  newLevel: Types.ReputationLevel;
  newRepuationScore: number;
}

export class MemberReputationLevelUpgraded extends DomainEvent {
  private constructor(
    props: MemberReputationLevelUpgradedEventProps,
    id?: string,
    retries?: number, 
    status?: DomainEventStatus,
    createdAt?: string
  ) {
    super('MemberReputationLevelUpgraded', props, props.memberId, id, retries, status, createdAt);
  }

  public static create (props: MemberReputationLevelUpgradedEventProps) {
    return new MemberReputationLevelUpgraded(props);
  }

  public static toDomain (eventModel: EventModel): MemberReputationLevelUpgraded {
    const serializedData = JSON.parse(eventModel.data) as MemberReputationLevelUpgradedEventProps

    // Validate this data here using zod or something

    return new MemberReputationLevelUpgraded(
      {
        memberId: serializedData.memberId,
        newLevel: serializedData.newLevel,
        newRepuationScore: serializedData.newRepuationScore
      }, 
      eventModel.id, eventModel.retries, 
      eventModel.status as DomainEventStatus, 
      eventModel.dateCreated.toISOString()
    )
  }
}
