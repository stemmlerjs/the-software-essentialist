
import { AggregateRoot } from "@dddforum/core";
import { ApplicationErrors } from "@dddforum/errors/application";
import { Member as MemberPrismaModel } from "@dddforum/database";
import { v4 as uuidv4 } from 'uuid';
import { MemberReputationLevelUpgraded } from "./memberReputationLevelUpgraded";
import { MemberUsername } from "./memberUsername";
import { DTOs, Types } from "@dddforum/api/members";

interface MemberProps {
  id: string;
  userId: string;
  username: MemberUsername;
  reputationScore: number;
  reputationLevel: Types.ReputationLevel
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

    if (this.reputationLevel === Types.ReputationLevel.Level1 && newScore >= Member.REPUTATION_SCORE_THRESHOLD.Level1) {
      this.props.reputationLevel = Types.ReputationLevel.Level2;
      const event = MemberReputationLevelUpgraded.create({ memberId: this.id, newLevel: this.reputationLevel, newRepuationScore: newScore });
      this.domainEvents.push(event);
      return;
    }

    if (this.reputationLevel === Types.ReputationLevel.Level2 && newScore >= Member.REPUTATION_SCORE_THRESHOLD.Level2) {
      this.props.reputationLevel = Types.ReputationLevel.Level3;
      const event = MemberReputationLevelUpgraded.create({ memberId: this.id, newLevel: this.reputationLevel, newRepuationScore: newScore });
      this.domainEvents.push(event);
      return;
    }
  }

  public static create (inputProps: CreateMemberInput): Member | ApplicationErrors.ValidationError {
    const memberUsername = MemberUsername.create(inputProps.username);

    // Example of using value objects to validate input to create the aggregate
    if (memberUsername instanceof ApplicationErrors.ValidationError) {
      return memberUsername;
    }

    // Can also validate userId and all other properties properly using either zod, 
    // value objects, or a mixture of both, with zod encapsulated within the objects.

    return new Member({
      ...inputProps,
      id: uuidv4(),
      reputationScore: 0,
      reputationLevel: Types.ReputationLevel.Level1,
      username: memberUsername
    });
  }

  public static toDomain (recreationProps: MemberPrismaModel | MemberProps): Member {
    return new Member({
      id: recreationProps.id,
      reputationScore: recreationProps.reputationScore,
      userId: recreationProps.userId,
      username: recreationProps.username instanceof MemberUsername ? recreationProps.username : MemberUsername.toDomain(recreationProps.username),
      reputationLevel: recreationProps.reputationLevel as Types.ReputationLevel
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

  public toDTO (): DTOs.MemberDTO {
    return {
      userId: this.props.userId,
      memberId: this.id,
      username: this.props.username.value,
      reputationLevel: this.props.reputationLevel,
      reputationScore: this.props.reputationScore,
    };
  }

}
