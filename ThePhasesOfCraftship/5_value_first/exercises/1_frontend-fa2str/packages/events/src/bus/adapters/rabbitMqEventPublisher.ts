import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import amqp from 'amqplib';

interface Config { 
  connectionString: string; 
  exchange?: string;
  subscriberGroup?: string;
  persistent?: boolean;
}

export class RabbitMQMessageBus {
  channel: amqp.ConfirmChannel | undefined
  subscriberGroup: string;
  exchange: string;
  subscribersByTopic: Map<string, any[]>;

  constructor(private config: Config) {
    config.persistent = config.persistent || false;
    this.subscriberGroup = config.subscriberGroup || 'default';
    this.exchange = config.exchange || 'domain-events';
    this.subscribersByTopic = new Map();
    this.channel = undefined;
  }

  async connect () {
    const connection = await amqp.connect(this.config.connectionString)
    this.channel = await connection.createConfirmChannel();
    this.channel.assertExchange(this.exchange, 'topic');
    this.channel.assertQueue(this.subscriberGroup, { durable: true });
    this.channel.consume(this.subscriberGroup, (message) => this.processMessage(message));
  }
  async subscribe(topic: string, subscriber: Function) {
    if (!this.channel) throw new Error('Channel not initialized');
    this.channel.bindQueue(this.subscriberGroup, this.exchange, topic);
    const newSubscribers = this.getSubscribers(topic).concat([subscriber]);
    this.subscribersByTopic.set(topic, newSubscribers);
    console.log(this.subscribersByTopic)
  }

  unsubscribe(topic: string, subscriber: Function) {
    const subscribers = this.getSubscribers(topic);
    subscribers.splice(subscribers.indexOf(subscriber), 1);
    this.subscribersByTopic.set(topic, subscribers);
  }

  getSubscribers(topic: string) { 
    return this.subscribersByTopic.get(topic) || []; 
  }

  async publish(topic: string, event: DomainEvent) {
    try {
      const json = event.serialize();
      return new Promise((resolve, reject) => {
        this.channel?.publish(this.exchange, topic, Buffer.from(json),{ persistent: true }, (err, ok) => {
          err ? reject(err) : resolve(undefined);
        })
      })
    } catch (err) {
      console.log(err);
    }
  }
  
  async processMessage(message: amqp.ConsumeMessage | null) {
      if (!this.channel) throw new Error('Channel not initialized');
      if (!message) return;
      const topic = message.fields.routingKey;
      const messageContent = message.content.toString();

      let subscribers = this.getSubscribers(topic);

      await Promise.all(subscribers.map(handler =>
        Promise.resolve(handler(messageContent))
      ));

      this.channel.ack(message);

    }
}
