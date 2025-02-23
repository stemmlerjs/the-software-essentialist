
describe('domainEvent', () => {

});

import { randomUUID } from "node:crypto";
import { TestEvent } from "./domainEvent";

describe('domainEvent', () => {
  let aggregateId = randomUUID();
  
  it('should be able to create a domain event', () => {
    const event = TestEvent.create(aggregateId, { testDataField: 'John' });
    expect(event).toBeDefined();
  });

  it ('should be able to get the event name', () => {
    const event = TestEvent.create(aggregateId, { testDataField: 'John' });
    expect(event.name).toBe('TestEvent');
  });

  it ('should be able to get the event props', () => {
    const event = TestEvent.create(aggregateId, { testDataField: 'John' });
    expect(event.data).toEqual({ testDataField: 'John' });
  });

  it ('should start out in the initial state', () => {
    const event = TestEvent.create(aggregateId, { testDataField: 'John' });
    expect(event.getStatus()).toEqual('INITIAL');
  });

  it ('should be able to transition to the published state', () => {
    const event = TestEvent.create(aggregateId, { testDataField: 'John' });
    event.markPublished();
    expect(event.getStatus()).toEqual('PUBLISHED');
  });

  it('should be able to record a failure to publish', () => {
    const event = TestEvent.create(aggregateId, { testDataField: 'John' });
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
