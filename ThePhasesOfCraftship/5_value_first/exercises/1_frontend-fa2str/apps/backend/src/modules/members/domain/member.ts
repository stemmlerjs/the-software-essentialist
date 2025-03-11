
import { AggregateRoot } from "@dddforum/core/aggregateRoot";
import { ValidationError } from "@dddforum/errors";
import { Member as MemberPrismaModel } from "@prisma/client";
import { randomUUID } from "crypto";
import { MemberReputationLevelUpgraded } from "./memberReputationLevelUpgraded";
import { MemberUsername } from "./memberUsername";
import { MemberDTO } from "@dddforum/api/posts";

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
    Level3: Infinity
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

  get userId () {
    return this.props.userId;
  }

  updateReputationScore (newScore: number) {
    this.props.reputationScore = newScore;

    if (this.reputationLevel === MemberReputationLevel.Level1 && newScore >= Member.REPUTATION_SCORE_THRESHOLD.Level1) {
      this.props.reputationLevel = MemberReputationLevel.Level2;
      const event = MemberReputationLevelUpgraded.create({ memberId: this.id, newLevel: this.reputationLevel, newRepuationScore: newScore });
      this.domainEvents.push(event);
      return;
    }

    if (this.reputationLevel === MemberReputationLevel.Level2 && newScore >= Member.REPUTATION_SCORE_THRESHOLD.Level2) {
      this.props.reputationLevel = MemberReputationLevel.Level3;
      const event = MemberReputationLevelUpgraded.create({ memberId: this.id, newLevel: this.reputationLevel, newRepuationScore: newScore });
      this.domainEvents.push(event);
      return;
    }
  }

  public static create (inputProps: CreateMemberInput): Member | ValidationError {
    const memberUsername = MemberUsername.create(inputProps.username);

    // Example of using value objects to validate input to create the aggregate
    if (memberUsername instanceof ValidationError) {
      return memberUsername;
    }

    // Can also validate userId and all other properties properly using either zod, 
    // value objects, or a mixture of both, with zod encapsulated within the objects.

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

  public toDTO (): MemberDTO {
    return {
      userId: this.props.userId,
      memberId: this.id,
      username: this.props.username.value,
      reputationLevel: this.props.reputationLevel,
      reputationScore: this.props.reputationScore,
    };
  }

}
