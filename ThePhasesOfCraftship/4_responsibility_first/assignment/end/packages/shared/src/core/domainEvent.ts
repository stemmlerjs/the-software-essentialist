import { randomUUID } from "crypto";
import { Event as EventModel } from '@prisma/client';

type DomainEventStatus = 'INITIAL' | 'RETRYING' | 'PUBLISHED' | 'FAILED';

type EventProps = {
  name: string;
  data: any;
  aggregateId: string;
  id?: string;
  retries?: number;
  status?: DomainEventStatus;
  createdAt?: string;
}

export abstract class DomainEvent {

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
  
  public static toDomain (prismaEventModel: EventModel) {
    switch (prismaEventModel.name) {
      case 'TestEvent':
        return TestEvent.toDomain(prismaEventModel);
      default:
        throw new Error('Event not recognized');
    }
  }

  public serializeData() {
    return JSON.stringify(this.data);
  }
}


interface TestEventData {
  testDataField: string;
}

export class TestEvent extends DomainEvent {
  private constructor (props: EventProps) {
    super(props.name, props.data, props.aggregateId, props.id, props.retries, props.status, props.createdAt);
  }

  public static create (aggregateId: string, data: TestEventData) {
    return new TestEvent({
      name: 'TestEvent',
      aggregateId, 
      data,
    });
  }

  public static toDomain (prismaEventModel: EventModel) {
    const data = JSON.parse(prismaEventModel.data) as TestEventData;
    // Validate that the data is the correct shape here using zod or something.

    return new TestEvent({
      data,
      aggregateId: prismaEventModel.aggregateId,
      id: prismaEventModel.id,
      retries: prismaEventModel.retries,
      status: prismaEventModel.status as DomainEventStatus,
      createdAt: prismaEventModel.dateCreated.toISOString(),
      name: prismaEventModel.name
    });
  }
}
