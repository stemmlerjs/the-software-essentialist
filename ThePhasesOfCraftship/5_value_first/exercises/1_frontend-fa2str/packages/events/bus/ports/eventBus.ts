import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";

export interface EventBus {
  publishEvents(events: DomainEvent[]): void;
  subscribe<T extends DomainEvent>(eventTypeName: string, handler: (event: T) => void): void;
  unsubscribe(eventTypeName: string, handler: (event: DomainEvent) => void): void;
}
