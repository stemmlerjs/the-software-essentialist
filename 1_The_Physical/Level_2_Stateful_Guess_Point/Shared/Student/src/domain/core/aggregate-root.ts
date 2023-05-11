import { DomainEvent } from "./domain-event";

export interface AggregateRoot<T> {
  readonly id: string;
  readonly state: T;
  readonly events: DomainEvent[];
}
