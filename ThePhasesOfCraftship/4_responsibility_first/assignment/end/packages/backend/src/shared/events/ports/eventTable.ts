

import { Prisma, PrismaClient, Event as PrismaEventModel } from "@prisma/client";
import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { PostUpvoted } from "../../../modules/posts/domain/postUpvoted";
import { PostDownvoted } from "../../../modules/posts/domain/postDownvoted";

export class EventsTable {
  constructor (private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public static toDomain (prismaEventModel: PrismaEventModel): DomainEvent {
    switch (prismaEventModel.name) {
      case 'PostUpvoted':
        return PostUpvoted.toDomain(prismaEventModel);
      case 'PostDownvoted':
        return PostDownvoted.toDomain(prismaEventModel);
      default:
        throw new Error('Event not recognized');
    }
  }

  async getEventsByAggregateId (aggregateId: string): Promise<DomainEvent[]> {
    const eventModels = await this.prisma.event.findMany({
      where: {
        aggregateId
      }
    });

    return eventModels.map((eventModel) => EventsTable.toDomain(eventModel))
  }

  async save(events: DomainEvent[], transaction?: Prisma.TransactionClient) {
    const prismaInstance = transaction || this.prisma;

    for (const event of events) {
      let result = await prismaInstance.event.create({
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

