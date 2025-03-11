
import { DomainEvent, EventModel } from "@dddforum/core"
import { Database } from '@dddforum/database';
import { Prisma } from '@prisma/client'

export class EventOutboxTable {

  constructor (private database: Database) {

  }

  async getUnprocessedEvents(): Promise<DomainEvent[]> {
    const dbConnection = this.database.getConnection();

    const events = await dbConnection.event.findMany({
      where: {
        status: 'INITIAL'
      }
    });

    return events.map((eventModel: EventModel) => DomainEvent.toDomain(eventModel))
  }

  async getEventsByAggregateId (aggregateId: string): Promise<DomainEvent[]> {
    const dbConnection = this.database.getConnection();
    const eventModels = await dbConnection.event.findMany({
      where: {
        aggregateId
      }
    });

    return eventModels.map((eventModel: EventModel) => DomainEvent.toDomain(eventModel))
  }

  async save(events: DomainEvent[], transaction?: Prisma.TransactionClient) {
    const prismaInstance = transaction || this.database.getConnection();

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

