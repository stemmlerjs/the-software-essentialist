import { EventOutboxTable } from "@dddforum/outbox";
import { Relay } from "./relay";
import { NatsEventBus } from "@dddforum/bus";
import { Config } from '@dddforum/config'
import { PrismaDatabase } from '@dddforum/database';

// Config object here to get the constructed items
const config = Config();
const database = new PrismaDatabase(config);
const outboxTable = new EventOutboxTable(database);
const nats = new NatsEventBus();
const relay = new Relay(outboxTable, nats);

relay.start();
