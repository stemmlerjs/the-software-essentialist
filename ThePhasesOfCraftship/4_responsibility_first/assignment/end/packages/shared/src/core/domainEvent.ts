import { randomUUID } from "crypto";

export type DomainEventStatus = 'INITIAL' | 'RETRYING' | 'PUBLISHED' | 'FAILED';

export abstract class DomainEvent {

  constructor(
    public readonly name: string,
    public readonly data: any,
    public readonly aggregateId: string,
    public readonly id: string = randomUUID(),
    private retries: number = 0,
    private status: DomainEventStatus = 'INITIAL',
    public readonly createdAt: string = new Date().toISOString()
  ) {

  }
  
  getStatus () { 
    return this.status;
  }

  markPublished () {
    return this.status = 'PUBLISHED';
  }

  recordFailureToProcess () {
    this.retries++;
    if (this.retries === 3) {
      this.status = 'FAILED';
      return;
    }

    this.status = 'RETRYING';
  }

  getRetries () {
    return this.retries;
  }

  public serializeData() {
    return JSON.stringify(this.data);
  }
}



