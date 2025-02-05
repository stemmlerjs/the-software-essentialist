
import { MemberDTO } from "@dddforum/shared/src/api/posts";
import { Member } from "@prisma/client";

interface MemberReadModelProps {
  id: string;
}

export class MemberReadModel {
  private props: MemberReadModelProps;

  constructor (props: MemberReadModelProps) {
    this.props = props;
  }  

  public static fromPrisma (member: Member) {
    return new MemberReadModel({
      id: member.id
    });
  }

  public toDTO (): MemberDTO {
    return {
      memberId: this.props.id
    }
  }
}
