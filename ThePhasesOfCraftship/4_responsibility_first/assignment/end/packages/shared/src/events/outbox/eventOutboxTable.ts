

import { Prisma, PrismaClient, Event as PrismaEventModel } from "@prisma/client";
import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";

export class EventOutboxTable {
  constructor (private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getEventsByAggregateId (aggregateId: string): Promise<PrismaEventModel[]> {
    const eventModels = await this.prisma.event.findMany({
      where: {
        aggregateId
      }
    });

    return eventModels;
  }

  async save(events: DomainEvent[], transaction?: Prisma.TransactionClient) {
    const prismaInstance = transaction || this.prisma;

    for (const event of events) {
      await prismaInstance.event.create({
        data: {
          id: event.id,
          name: event.name,
          data: JSON.stringify(event.data),
          status: event.getStatus(),
          retries: event.getRetries(),
          aggregateId: event.aggregateId,
          dateCreated: event.createdAt
        }
      });
    }
  }
}

