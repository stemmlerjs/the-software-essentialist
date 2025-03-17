import { DomainEvent } from "@dddforum/core";
import { EventBus } from "../ports/eventBus";
import { connect, NatsConnection, Subscription } from "nats";

export class NatsEventBus implements EventBus {
  private nc!: NatsConnection;
  private subscriptions: Map<string, Subscription>;

  constructor() {
    this.subscriptions = new Map();
    this.initialize();
  }

  public async initialize() {
    if (!this.nc) {
      this.nc = await connect({ servers: "nats://localhost:4222" });
      console.log('initialized event bus');
    }
  }

  public async stop () {
    await this.nc.close();
  }

  async publishEvents(events: DomainEvent[]): Promise<void> {
    try {
      for (const event of events) {
        await this.nc.publish(event.name, JSON.stringify(event));
      }
    } catch (error) {
      console.error(`Error publishing event: ${error}`);
    }
  }

  async subscribe<T extends DomainEvent>(eventTypeName: string, handler: (event: T) => void): Promise<void> {
    const subscription = this.nc.subscribe(eventTypeName, {
      callback: (err, msg) => {
        console.log('message', msg)
        if (err) {
          console.error(`Error receiving message: ${err.message}`);
          return;
        }
        const event = JSON.parse(msg.data.toString()) as T;
        handler(event);
      },
    });
    this.subscriptions.set(eventTypeName, subscription);
  }

  async unsubscribe(eventTypeName: string): Promise<void> {
    const subscription = this.subscriptions.get(eventTypeName);
    if (subscription) {
      await subscription.drain();
      this.subscriptions.delete(eventTypeName);
    }
  }
}
