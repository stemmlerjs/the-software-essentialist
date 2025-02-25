import { Prisma, PrismaClient } from "@prisma/client";
import { Member } from "../../domain/member";
import { MembersRepository } from "../ports/membersRepository";
import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";

export class ProductionMembersRepository implements MembersRepository {

  constructor (private prisma: PrismaClient, private eventsTable: EventOutboxTable) {
    
  }
  getMemberByUserId(userId: string): Promise<Member | null> {
    throw new Error("Method not implemented.");
  }

  saveAggregateAndEvents(member: Member, events: DomainEvent[]): Promise<void> {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await this.save(member, tx);
      await this.eventsTable.save(events, tx);
    })
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

  async save(member: Member, transaction?: Prisma.TransactionClient) {
      const prismaInstance = transaction || this.prisma;
  
    const memberData = member.toPersistence();

    try {
      await prismaInstance.member.upsert({
        where: { id: memberData.id },
        update: memberData,
        create: memberData,
      });
    } catch (err) {
      console.log(err)
      throw new Error("Database exception");
    }
  }
  
  
}
