import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { RabbitMQMessageBus } from "@dddforum/shared/src/events/bus/adapters/rabbitMqEventPublisher";
import { PrismaClient } from "@prisma/client";
import { Relay } from "./relay";
import dotenv from 'dotenv';
import { NatsEventBus } from "@dddforum/shared/src/events/bus/adapters/natsEventBus";

dotenv.config();

const prisma = new PrismaClient();
const outboxTable = new EventOutboxTable(prisma);
const nats = new NatsEventBus();
const relay = new Relay(outboxTable, nats);

relay.start();
