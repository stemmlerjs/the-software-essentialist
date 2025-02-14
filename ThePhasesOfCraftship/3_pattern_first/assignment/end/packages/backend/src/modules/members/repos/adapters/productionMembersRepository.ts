import { PrismaClient } from "@prisma/client";
import { Member } from "../../domain/member";
import { MembersRepository } from "../ports/membersRepository";

export class ProductionMembersRepository implements MembersRepository {

  constructor (private prisma: PrismaClient) {
    
  }
  findUserByUsername(username: string): Promise<Member | null> {
    throw new Error("Method not implemented.");
  }
  
  async getMemberById(memberId: string): Promise<Member | null> {
    const memberData = await this.prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!memberData) {
      return null;
    }

    return Member.toDomain(memberData);
  }

  async save(member: Member): Promise<void> {
    const memberData = member.toPersistence();

    // TODO: Implement this
    // await this.prisma.member.upsert({
    //   where: { id: member.id },
    //   update: memberData,
    //   create: memberData,
    // });
  }
  
  
}
