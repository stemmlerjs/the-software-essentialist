

import { randomUUID } from "node:crypto";
import { DomainEvent } from "./domainEvent";
import { DomainEventStatus } from "./domainEvent";
import { EventModel } from "./eventModel";

interface TestEventProps {
  aggregateId: string
  testDataField: string;
}

export class TestEvent extends DomainEvent {
  private constructor(
      props: TestEventProps,
      id?: string,
      retries?: number, 
      status?: DomainEventStatus,
      createdAt?: string
    ) {
      super('TestEvent', props, props.aggregateId, id, retries, status, createdAt);
    }

  public static create (data: TestEventProps) {
    return new TestEvent(data);
  }

  public static toDomain (prismaEventModel: EventModel) {
    const data = JSON.parse(prismaEventModel.data) as TestEventProps;

    return new TestEvent(data,
      prismaEventModel.id,
      prismaEventModel.retries,
      prismaEventModel.status as DomainEventStatus,
      prismaEventModel.dateCreated.toISOString()
    );
  }
}

describe('domainEvent', () => {
  let aggregateId = randomUUID();
  
  it('should be able to create a domain event', () => {
    const event = TestEvent.create({ testDataField: 'John', aggregateId });
    expect(event).toBeDefined();
  });

  it ('should be able to get the event name', () => {
    const event = TestEvent.create({ testDataField: 'John', aggregateId });
    expect(event.name).toBe('TestEvent');
  });

  it ('should be able to get the event props', () => {
    const event = TestEvent.create({ testDataField: 'John', aggregateId });
    expect(event.data).toEqual({ testDataField: 'John' });
  });

  it ('should start out in the initial state', () => {
    const event = TestEvent.create({ testDataField: 'John', aggregateId });
    expect(event.getStatus()).toEqual('INITIAL');
  });

  it ('should be able to transition to the published state', () => {
    const event = TestEvent.create({ testDataField: 'John', aggregateId });
    event.markPublished();
    expect(event.getStatus()).toEqual('PUBLISHED');
  });

  it('should be able to record a failure to publish', () => {
    const event = TestEvent.create({ testDataField: 'John', aggregateId });
    expect(event.getRetries()).toEqual(0);
    event.recordFailureToProcess();

    expect(event.getRetries()).toEqual(1);
    expect(event.getStatus()).toEqual('RETRYING');

    event.recordFailureToProcess();

    expect(event.getRetries()).toEqual(2);
    expect(event.getStatus()).toEqual('RETRYING');

    event.recordFailureToProcess();

    expect(event.getRetries()).toEqual(3);
    expect(event.getStatus()).toEqual('FAILED');
  });
})
