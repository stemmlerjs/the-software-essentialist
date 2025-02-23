
import { EventBus } from "@dddforum/shared/src/events/bus/ports/eventBus";
import { MembersRepository } from "../repos/ports/membersRepository";
import { CreateMember } from "./useCases/createMember/createMember";

export class MemberService {
  constructor(
    private membersRepository: MembersRepository,
    private eventBus: EventBus,
  ) {}

  public createMember () {
    // Not yet implemented
  }
  
}
