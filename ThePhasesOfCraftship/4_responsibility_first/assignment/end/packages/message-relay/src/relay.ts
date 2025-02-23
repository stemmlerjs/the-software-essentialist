

/**
 * - every 2 seconds, check the database for new messages
 * - if there are new messages, add them to the local queue to process
 * - process the message in the queue
 */

import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";




export class MessageRelay {
  
  constructor (private outboxTable: EventOutboxTable) {
    this.outboxTable = outboxTable
  }

  public start() {
    setInterval(async () => {
      const newMessages = await this.checkDatabaseForNewMessages();
      if (newMessages.length > 0) {
        this.addToQueue(newMessages);
      }
    }, 2000);
  }

  private async checkDatabaseForNewMessages(): Promise<string[]> {
    // Implement the logic to check the database for new messages
    // This is a placeholder implementation
    return [];
  }

  private addToQueue(messages: string[]): void {
    // Implement the logic to add messages to the local queue
    // This is a placeholder implementation
  }

  private processQueue(): void {
    // Implement the logic to process messages in the queue
    // This is a placeholder implementation
  }
}
