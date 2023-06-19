
import { DomainEvent } from "./domainEvent";

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[];

  constructor () {
    this.domainEvents = [];
  }

  getEvents () {
    return this.domainEvents;
  }
}