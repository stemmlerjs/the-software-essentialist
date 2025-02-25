
import { AggregateRoot } from "@dddforum/shared/src/core/aggregateRoot";
import { ValidationError } from "@dddforum/shared/src/errors";
import { Member as MemberPrismaModel } from "@prisma/client";
import { randomUUID } from "crypto";
import { MemberReputationLevelUpgraded } from "./memberReputationLevelUpgraded";
import { MemberUsername } from "./memberUsername";

interface MemberProps {
  id: string;
  userId: string;
  username: MemberUsername;
  reputationScore: number;
  reputationLevel: MemberReputationLevel
}

export enum MemberReputationLevel { Level1 = 'Level 1', Level2 = 'Level 2', Level3 = 'Level 3' }

interface CreateMemberInput {
  userId: string;
  username: string;
}

export class Member extends AggregateRoot {

  public static REPUTATION_SCORE_THRESHOLD = {
    Level1: 5,
    Level2: 10,
    Level3: undefined
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

    if (oldScore < Member.REPUTATION_SCORE_THRESHOLD.Level1 && newScore >= Member.REPUTATION_SCORE_THRESHOLD.Level1) {
      this.props.reputationLevel = MemberReputationLevel.Level1;
      this.domainEvents.push(new MemberReputationLevelUpgraded(this.id, this.reputationLevel));
    } else if (oldScore < Member.REPUTATION_SCORE_THRESHOLD.Level2 && newScore >= Member.REPUTATION_SCORE_THRESHOLD.Level2) {
      this.props.reputationLevel = MemberReputationLevel.Level2;
      this.domainEvents.push(new MemberReputationLevelUpgraded(this.id, this.reputationLevel));
    }
  }

  public static create (inputProps: CreateMemberInput): Member | ValidationError {
    const memberUsername = MemberUsername.create(inputProps.username);

    // Example of using value objects to validate input to create the aggregate
    if (memberUsername instanceof ValidationError) {
      return memberUsername;
    }

    return new Member({
      ...inputProps,
      id: randomUUID(),
      reputationScore: 0,
      reputationLevel: MemberReputationLevel.Level1,
      username: memberUsername
    });
  }

  public static toDomain (recreationProps: MemberPrismaModel | MemberProps): Member {
    return new Member({
      id: recreationProps.id,
      reputationScore: recreationProps.reputationScore,
      userId: recreationProps.userId,
      username: recreationProps.username instanceof MemberUsername ? recreationProps.username : MemberUsername.toDomain(recreationProps.username),
      reputationLevel: recreationProps.reputationLevel as MemberReputationLevel
    });
  }

  toPersistence () {
    return {
      id: this.id,
      userId: this.props.userId,
      username: this.props.username.value,
      reputationScore: this.props.reputationScore,
      reputationLevel: this.props.reputationLevel,
    }
  }

}
