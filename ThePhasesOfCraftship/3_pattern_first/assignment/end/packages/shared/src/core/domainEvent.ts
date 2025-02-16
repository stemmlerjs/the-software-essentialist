
export abstract class DomainEvent {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
  ) {}
}
