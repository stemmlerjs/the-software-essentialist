import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { randomUUID } from "crypto";
import { MemberReputationLevel } from "./member";

export class MemberReputationLevelUpgraded extends DomainEvent {
  constructor (
    public readonly memberId: string,
    public readonly newLevel: MemberReputationLevel,
    public readonly id: string = randomUUID(),
    public readonly date: Date = new Date()
    ) {
      super(id, date, 'MemberReputationLevelUpgraded');
    }
}
