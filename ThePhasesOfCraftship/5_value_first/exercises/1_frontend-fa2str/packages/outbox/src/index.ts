
// TODO: need to move these around. this should not know about this.
import { Prisma, PrismaClient, Event as PrismaEventModel } from "@prisma/client";
import { DomainEvent } from "@dddforum/core"

export class EventOutboxTable {
  constructor (private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUnprocessedEvents(): Promise<DomainEvent[]> {
    const events = await this.prisma.event.findMany({
      where: {
        status: 'INITIAL'
      }
    });

    return events.map((eventModel) => DomainEvent.toDomain(eventModel))
  }

  async getEventsByAggregateId (aggregateId: string): Promise<DomainEvent[]> {
    const eventModels = await this.prisma.event.findMany({
      where: {
        aggregateId
      }
    });

    return eventModels.map((eventModel) => DomainEvent.toDomain(eventModel))
  }

  async save(events: DomainEvent[], transaction?: Prisma.TransactionClient) {
    const prismaInstance = transaction || this.prisma;

    for (const event of events) {
      await prismaInstance.event.upsert({
        where: { id: event.id },
        update: {
          name: event.name,
          data: JSON.stringify(event.data),
          status: event.getStatus(),
          retries: event.getRetries(),
          aggregateId: event.aggregateId,
          dateCreated: event.createdAt
        },
        create: {
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

