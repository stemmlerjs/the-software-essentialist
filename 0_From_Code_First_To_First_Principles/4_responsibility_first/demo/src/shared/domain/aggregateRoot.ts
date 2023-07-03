
import { DomainEvent } from "./domainEvent";

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[];

  constructor () {
    this.domainEvents = [];
  }

  addDomainEvent (event: DomainEvent) {
    this.domainEvents.push(event);
  }

  getEvents () {
    return this.domainEvents;
  }
}