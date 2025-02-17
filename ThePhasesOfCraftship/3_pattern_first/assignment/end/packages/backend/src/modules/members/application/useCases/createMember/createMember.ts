
import { UseCase } from "@dddforum/shared/src/core/useCase";
import { MembersRepository } from "../../../repos/ports/membersRepository";
import { EventBus } from "../../../../../shared/eventBus/ports/eventBus";
import { Member } from "../../../domain/member";
import { CreateMemberCommand } from "../../../memberCommands";
import { UsersService } from "../../../../users/usersService";

class MemberAlreadyExistsError {
  
}

type CreateMemberResponse = Member | MemberUsernameTaken;

export class CreateMember implements UseCase<CreateMemberCommand, CreateMemberResponse> {
  constructor(
    private userService: UsersService,
    private memberRepository: MembersRepository,
    private eventBus: EventBus
  ) {}

  async execute(request: CreateMemberCommand): Promise<CreateMemberResponse> {
    throw new Error('Not yet implemented')
  }
  
}
