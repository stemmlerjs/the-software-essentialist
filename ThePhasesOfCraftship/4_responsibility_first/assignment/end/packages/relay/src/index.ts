import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { RabbitMQMessageBus } from "@dddforum/shared/src/events/bus/adapters/rabbitMqEventPublisher";
import { PrismaClient } from "@prisma/client";
import { Relay } from "./relay";
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const outboxTable = new EventOutboxTable(prisma);
const publisher = new RabbitMQMessageBus({
  connectionString: 'amqp://user:password@127.0.0.1:5672'
});
const relay = new Relay(outboxTable, publisher);

relay.start();
