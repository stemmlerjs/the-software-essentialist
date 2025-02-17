
import { AggregateRoot } from "@dddforum/shared/src/core/aggregateRoot";
import { ValidationError } from "@dddforum/shared/src/errors";
import { Member as MemberPrismaModel } from "@prisma/client";
import { randomUUID } from "crypto";
import { MemberReputationLevelUpgraded } from "./memberReputationLevelUpgraded";

interface MemberProps {
  id: string;
  userId: string;
  username: string;
  reputationScore: number;
  reputationLevel: MemberReputationLevel
}

export enum MemberReputationLevel { Level1 = 'Level 1', Level2 = 'Level 2' }

interface CreateMemberInput {
  userId: string;
  username: string;
}

export class Member extends AggregateRoot {

  public static REPUTATION_SCORES = {
    Level1: 5,
    Level2: 10
  }

  private props: MemberProps;

  private constructor (props: MemberProps) {
    super();
    this.props = props
  }

  get id () {
    return this.props.id;
  }

  get reputationScore () {
    return this.props.reputationScore
  }

  get username () {
    return this.props.username;
  }

  get reputationLevel () {
    return this.props.reputationLevel;
  }

  updateReputationScore (newScore: number) {
    const oldScore = this.props.reputationScore;
    this.props.reputationScore = newScore;

    if (oldScore < Member.REPUTATION_SCORES.Level1 && newScore >= Member.REPUTATION_SCORES.Level1) {
      this.props.reputationLevel = MemberReputationLevel.Level1;
      this.domainEvents.push(new MemberReputationLevelUpgraded(this.id, this.reputationLevel));
    } else if (oldScore < Member.REPUTATION_SCORES.Level2 && newScore >= Member.REPUTATION_SCORES.Level2) {
      this.props.reputationLevel = MemberReputationLevel.Level2;
      this.domainEvents.push(new MemberReputationLevelUpgraded(this.id, this.reputationLevel));
    }
  }

  public static create (inputProps: CreateMemberInput): Member | ValidationError {
    return new Member({
      ...inputProps,
      id: randomUUID(),
      reputationScore: 0,
      reputationLevel: MemberReputationLevel.Level1,
    });
  }

  public static toDomain (recreationProps: MemberPrismaModel | MemberProps): Member {
    return new Member({
      id: recreationProps.id,
      reputationScore: recreationProps.reputationScore,
      userId: recreationProps.userId,
      username: recreationProps.username,
      reputationLevel: recreationProps.reputationLevel as MemberReputationLevel
    });
  }

  toPersistence () {
    return {
      id: this.id,
      userId: this.props.userId,
      username: this.props.username,
      reputationScore: this.props.reputationScore,
      reputationLevel: this.props.reputationLevel
    }
  }

}
