import { randomUUID } from "crypto";
import { Event as PrismaEventModel } from "@prisma/client";

export type DomainEventStatus = 'INITIAL' | 'RETRYING' | 'PUBLISHED' | 'FAILED';

export class DomainEvent {

  constructor(
    public readonly name: string,
    public readonly data: any,
    public readonly aggregateId: string,
    public readonly id: string = randomUUID(),
    private retries: number = 0,
    private status: DomainEventStatus = 'INITIAL',
    public readonly createdAt: string = new Date().toISOString()
  ) {

  }
  
  getStatus () { 
    return this.status;
  }

  markPublished () {
    return this.status = 'PUBLISHED';
  }

  recordFailureToProcess () {
    this.retries++;
    if (this.retries === 3) {
      this.status = 'FAILED';
      return;
    }

    this.status = 'RETRYING';
  }

  getRetries () {
    return this.retries;
  }

  public serializeData() {
    return JSON.stringify(this.data);
  }

  public static toDomain(prismaEventModel: PrismaEventModel): DomainEvent {
    return new DomainEvent(
      prismaEventModel.name,
      JSON.parse(prismaEventModel.data),
      prismaEventModel.aggregateId,
      prismaEventModel.id,
      prismaEventModel.retries,
      prismaEventModel.status as DomainEventStatus,
      prismaEventModel.dateCreated.toISOString()
    );
  }
}



