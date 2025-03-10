import { DomainEvent } from "@dddforum/core";
import { EventBus } from "../ports/eventBus";

type EventHandler<T extends DomainEvent> = (event: T) => void;

export class InMemoryEventBus implements EventBus {
  private subscriptions: Map<string, Array<EventHandler<DomainEvent>>> = new Map();

  publishEvents(events: DomainEvent[]): void {
    events.forEach(event => {
      const eventType = event.constructor.name;
      const handlers = this.subscriptions.get(eventType);
  
      if (handlers) {
        console.log(`Publishing event: ${eventType}`);
        handlers.forEach(handler => handler(event));
      }
    });
  }

  subscribe<T extends DomainEvent>(eventTypeName: string, handler: EventHandler<T>): void {
    const handlers = this.subscriptions.get(eventTypeName) || [];
    handlers.push(handler as EventHandler<DomainEvent>);
    this.subscriptions.set(eventTypeName, handlers);
  }

  unsubscribe(eventTypeName: string, handler: EventHandler<DomainEvent>): void {
    const handlers = this.subscriptions.get(eventTypeName);

    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }
}
