
import { EventOutboxTable } from "@dddforum/outbox";
import { DomainEvent } from '@dddforum/core';
import { EventBus } from "@dddforum/bus";

export class Relay {
  private queue: DomainEvent[];
  private isProcessing = false;
  private static QUEUE_PROCESS_INTERVAL = 2000;

  constructor (
    private outboxTable: EventOutboxTable, 
    private publisher: EventBus
  ) {
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
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const event = this.queue.shift();
      
      if (!event) {
        continue;
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

    this.isProcessing = false;
    }

  private async publishToRabbitMQ(event: DomainEvent): Promise<void> {
    console.log(`Publishing event to Message Broker: ${event.name} ${JSON.stringify(event.data)}`);
    await this.publisher.publishEvents([event]);
  }
}
