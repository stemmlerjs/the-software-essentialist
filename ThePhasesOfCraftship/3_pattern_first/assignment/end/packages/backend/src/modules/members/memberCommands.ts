
export class CreateMemberCommand {
  constructor(
    public readonly props: {
      name: string;
      email: string;
    }
  ) {}
}
