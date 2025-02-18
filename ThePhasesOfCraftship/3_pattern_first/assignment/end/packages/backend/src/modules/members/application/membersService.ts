import { EventBus } from "../../../shared/eventBus/ports/eventBus";
import { VoteRepository } from "../../votes/repos/ports/voteRepository";
import { UpdateMemberReputationScoreCommand } from "../memberCommands";
import { MembersRepository } from "../repos/ports/membersRepository";
import { UpdateMemberReputationScore } from "./useCases/updateMemberReputation/updateMemberReputationScore";

export class MemberService {
  constructor(
    private membersRepository: MembersRepository,
    private votesRepository: VoteRepository,
    private eventBus: EventBus,
  ) {}

  updateMemberReputationScore(command: UpdateMemberReputationScoreCommand) {
    return new UpdateMemberReputationScore(
      this.membersRepository,
      this.votesRepository,
      this.eventBus,
    ).execute(command);
  }
}
