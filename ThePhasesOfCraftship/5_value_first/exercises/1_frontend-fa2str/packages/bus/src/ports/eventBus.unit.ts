import { EventBus } from './eventBus'; 
import { InMemoryEventBus } from '../adapters/inMemoryEventBus';
import { DomainEvent } from '@dddforum/core';

class TestEvent extends DomainEvent {
  constructor(public data: string) {
    super('testEventId', new Date(), 'TestEvent');
  }
}

class AnotherTestEvent extends DomainEvent {
  constructor(public data: string) {
    super('anotherTestEventId', new Date(), 'AnotherTestEvent');
  }
}

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new InMemoryEventBus();
  });

  it('should register an event listener', () => {
    const listener = jest.fn();
    let testEvent = new TestEvent('testData');
    eventBus.subscribe('TestEvent', listener);
    eventBus.publishEvents([ testEvent ]);
    expect(listener).toHaveBeenCalledWith(testEvent);
  });

  it('should emit an event to multiple listeners', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    eventBus.subscribe('TestEvent', listener1);
    eventBus.subscribe('TestEvent', listener2);
    const testEvent = new TestEvent('testData');
    eventBus.publishEvents([testEvent]);
    expect(listener1).toHaveBeenCalledWith(testEvent);
    expect(listener2).toHaveBeenCalledWith(testEvent);
  });

  it('should not call listeners for different events', () => {
    const listener = jest.fn();
    eventBus.subscribe('TestEvent', listener);

    const testEvent = new TestEvent('testData');
    const differentEvent = new AnotherTestEvent('differentData');

    eventBus.publishEvents([testEvent]);
    eventBus.publishEvents([differentEvent]);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(testEvent);
    expect(listener).not.toHaveBeenCalledWith(differentEvent);
  });

  it('should remove an event listener', () => {
    const listener = jest.fn();
    eventBus.subscribe('TestEvent', listener);
    eventBus.unsubscribe('TestEvent', listener);

    const testEvent = new TestEvent('testData');
    eventBus.publishEvents([testEvent]);

    expect(listener).not.toHaveBeenCalled();
  });
});
