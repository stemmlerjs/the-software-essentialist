
import { Members } from '@dddforum/api'

interface MemberDmProps {
  id: string;
  username: string;
  email: string;
  userId: string;
  reputationLevel: Members.Types.ReputationLevel
}

export class MemberDm {
  private props: MemberDmProps;

  constructor(props: MemberDmProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email;
  }

  get userId(): string {
    return this.props.userId;
  }

  get reputationLevel (): Members.Types.ReputationLevel {
    return this.props.reputationLevel
  }

  toDTO() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      userId: this.userId
    };
  }
}