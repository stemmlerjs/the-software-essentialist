
export class UpdateMemberReputationScoreCommand {
  constructor(
    public readonly props: {
      memberId: string;
    }
  ) {}
}
