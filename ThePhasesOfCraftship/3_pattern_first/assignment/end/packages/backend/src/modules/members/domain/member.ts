
import { Member as MemberPrismaModel } from "@prisma/client";


interface MemberProps {
  reputationScore: number;
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

  get reputationScore () {
    return this.props.reputationScore
  }

  public static toDomainFromPrisma (prismaMember: MemberPrismaModel): Member {
    return new Member({
      reputationScore: prismaMember.reputationScore
    });
  }

  toPersistence () {
    return {
      reputationScore: this.props.reputationScore
    }
  }

}
