import { v4 as uuidv4 } from 'uuid';
import { EventModel } from "./eventModel";

export type DomainEventStatus = 'INITIAL' | 'RETRYING' | 'PUBLISHED' | 'FAILED';

// Define the expected structure instead of importing from Prisma


export class DomainEvent {

  constructor(
    public readonly name: string,
    public readonly data: any,
    public readonly aggregateId: string,
    public readonly id: string = uuidv4(),
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

  public serialize() {
    return JSON.stringify(this);
  }

  public static toDomain(eventModel: EventModel): DomainEvent {
    return new DomainEvent(
      eventModel.name,
      JSON.parse(eventModel.data),
      eventModel.aggregateId,
      eventModel.id,
      eventModel.retries,
      eventModel.status as DomainEventStatus,
      eventModel.dateCreated.toISOString()
    );
  }
}



