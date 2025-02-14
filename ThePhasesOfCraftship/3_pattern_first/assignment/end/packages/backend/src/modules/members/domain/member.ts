
import { ValidationError } from "@dddforum/shared/src/errors";
import { Member as MemberPrismaModel } from "@prisma/client";
import { randomUUID } from "crypto";

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

export class Member {

  public static REPUTATION_SCORES = {
    Level1: 5,
    Level2: 10
  }

  private props: MemberProps;

  private constructor (props: MemberProps) {
    this.props = props
  }

  get id () {
    return this.props.id;
  }

  get reputationScore () {
    return this.props.reputationScore
  }

  get reputationLevel () {
    return this.props.reputationLevel;
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
      reputationScore: this.props.reputationScore
    }
  }

}
