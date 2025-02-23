
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { DomainEvent } from '@dddforum/shared/src/core/domainEvent';

export class Relay {
  private queue: DomainEvent[];

  constructor (private outboxTable: EventOutboxTable) {
    this.outboxTable = outboxTable
    this.queue = []
  }

  public start() {
    setInterval(async () => {
      const newEvents = await this.outboxTable.getUnprocessedEvents();
      if (newEvents.length > 0) {
        this.addToQueue(newEvents);
      }
      this.processQueue();
    }, 2000);
  }

  private addToQueue(events: DomainEvent[]): void {
    events.forEach(event => {
      const isDuplicate = this.queue.some(
        queuedEvent => queuedEvent.aggregateId === event.aggregateId && queuedEvent.name === event.name
      );
      if (!isDuplicate) {
        this.queue.push(event);
      }
    });
  }

  private async processQueue(): Promise<void> {
    if (this.queue.length === 0) {
      return;
    }

    const event = this.queue.shift();
    if (!event) {
      return;
    }

    try {
      // Attempt to write it to RabbitMQ 
      await this.publishToRabbitMQ(event);

      // Mark it as published and save the event
      event.markPublished();
      await this.outboxTable.save([event]);
    } catch (error) {
      event.recordFailureToProcess();
      // Increment the retries and save the event
      await this.outboxTable.save([event]);
    }
  }

  private async publishToRabbitMQ(event: DomainEvent): Promise<void> {
    // Implement the logic to publish the event to RabbitMQ
    // This is a placeholder function and should be replaced with actual implementation
    console.log(`Publishing event to RabbitMQ: ${event.name}`);
  }
}
