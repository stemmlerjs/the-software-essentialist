
export abstract class DomainEvent {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly name: string,
  ) {}
}
