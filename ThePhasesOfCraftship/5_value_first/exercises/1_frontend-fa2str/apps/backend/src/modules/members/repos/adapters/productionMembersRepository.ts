import { Prisma } from "@prisma/client";
import { Member } from "../../domain/member";
import { MembersRepository } from "../ports/membersRepository";
import { DomainEvent } from "@dddforum/core";
import { EventOutboxTable } from "@dddforum/outbox";
import { Database } from "@dddforum/database";

export class ProductionMembersRepository implements MembersRepository {

  constructor (
    private database: Database, 
    private eventsTable: EventOutboxTable
  ) {
    
  }
  
  async getMemberByUserId(userId: string): Promise<Member | null> {
    const connection = this.database.getConnection();
    const memberData = await connection.member.findUnique({
      where: { userId: userId },
    });

    if (!memberData) {
      return null;
    }

    return Member.toDomain(memberData);
  }

  saveAggregateAndEvents(member: Member, events: DomainEvent[]): Promise<void> {
    const connection = this.database.getConnection();
    return connection.$transaction(async (tx: Prisma.TransactionClient) => {
      await this.save(member, tx);
      await this.eventsTable.save(events, tx);
    })
  }

  async findUserByUsername(username: string): Promise<Member | null> {
    const connection = this.database.getConnection();
    const memberData = await connection.member.findUnique({
      where: { username: username },
    });

    if (!memberData) {
      return null;
    }

    return Member.toDomain(memberData);
  }
  
  async getMemberById(memberId: string): Promise<Member | null> {
    const connection = this.database.getConnection();
    const memberData = await connection.member.findUnique({
      where: { id: memberId },
    });

    if (!memberData) {
      return null;
    }

    return Member.toDomain(memberData);
  }

  async save(member: Member, transaction?: Prisma.TransactionClient) {
      const prismaInstance = transaction || this.database.getConnection();;
  
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
