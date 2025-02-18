
import { MemberDTO } from "@dddforum/shared/src/api/posts";
import { Member } from "@prisma/client";

interface MemberReadModelProps {
  id: string;
  username: string;
}

export class MemberReadModel {
  private props: MemberReadModelProps;

  constructor (props: MemberReadModelProps) {
    this.props = props;
  }  

  get id () {
    return this.props.id;
  }

  get username () {
    return this.props.username;
  }

  public static fromPrisma (member: Member) {
    return new MemberReadModel({
      id: member.id,
      username: member.username,
    });
  }

  // Continue to add the remaining properties when necessary
  public toDTO (): MemberDTO {
    return {
      memberId: this.props.id,
      username: this.props.username
    }
  }
}
