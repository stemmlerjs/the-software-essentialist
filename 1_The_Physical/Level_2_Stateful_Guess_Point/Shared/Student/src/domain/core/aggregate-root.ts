export interface AggregateRoot<T> {
  readonly id: string;
  readonly state: T;
}
