import { PrismaClient } from "@prisma/client";
import { Member } from "../../domain/member";
import { MembersRepository } from "../ports/membersRepository";

export class ProductionMembersRepository implements MembersRepository {

  constructor (private prisma: PrismaClient) {
    
  }
  async findUserByUsername(username: string): Promise<Member | null> {
    
    const memberData = await this.prisma.member.findUnique({
      where: { username: username },
    });

    if (!memberData) {
      return null;
    }

    return Member.toDomain(memberData);
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

    await this.prisma.member.upsert({
      where: { id: memberData.id },
      update: memberData,
      create: memberData,
    });
  }
  
  
}
