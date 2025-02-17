
export class UpdateMemberReputationScoreCommand {
  constructor(
    public readonly props: {
      memberId: string;
    }
  ) {}
}

export class CreateMemberCommand {
  constructor(
    public readonly props: {
      name: string;
      email: string;
    }
  ) {}
}
