
import { Result, UseCase } from "@dddforum/core";
import { MembersRepository } from "../../../repos/ports/membersRepository";
import { Member } from "../../../domain/member";
import { ApplicationErrors } from "@dddforum/errors/application";

export type GetMemberDetailsError = ApplicationErrors.NotFoundError;

export class GetMemberDetails implements UseCase<string, Result<Member, GetMemberDetailsError>> {
  constructor(private memberRepository: MembersRepository) {}

  async execute(userId: string): Promise<Result<Member, GetMemberDetailsError>> {
    const member = await this.memberRepository.getMemberByUserId(userId);

    if (!member) {
      return Result.failure(new ApplicationErrors.NotFoundError('member'));
    }

    return Result.success(member);
  }
}