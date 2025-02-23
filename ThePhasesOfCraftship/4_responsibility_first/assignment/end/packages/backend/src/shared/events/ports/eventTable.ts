

import { Prisma, PrismaClient } from "@prisma/client";
import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { NotFoundError } from "@dddforum/shared/src/errors";

export class EventsTable {
  constructor (private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getEventByAggregateId (aggregateId: string): Promise<DomainEvent | NotFoundError> {
    const eventModel = await this.prisma.event.findFirst({
      where: {
        aggregateId
      }
    });

    if (!eventModel) {
      return new NotFoundError('Event not found');
    }

    return DomainEvent.toDomain(eventModel);
  }

  save(events: DomainEvent[], transaction?: Prisma.TransactionClient) {
    const prismaInstance = transaction || this.prisma;

    for (const event of events) {
      prismaInstance.event.create({
        data: {
          id: event.id,
          name: event.name,
          data: event.data,
          status: event.getStatus(),
          retries: event.getRetries(),
          aggregateId: event.aggregateId,
          dateCreated: event.createdAt
        }
      });
    }
  }
}

