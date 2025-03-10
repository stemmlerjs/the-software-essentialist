import { DomainEvent, DomainEventStatus } from "@dddforum/shared/src/core/domainEvent";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { Relay } from "../src/relay";
import { NatsEventBus  } from "@dddforum/shared/src/events/bus/adapters/natsEventBus";

class TestEvent extends DomainEvent {
    constructor (aggregateId: string, data: any, id?: string, retries?: number, status?: DomainEventStatus) {
      super('TestEvent', data, aggregateId, id, retries, status);
    }
  }

let prisma = new PrismaClient();
let outbox = new EventOutboxTable(prisma);
let natsEventBus = new NatsEventBus();
let relay = new Relay(outbox, natsEventBus);

async function setupLab () {
  let unprocessedEvents = [
    new TestEvent(randomUUID(), { testData: 'John' }, randomUUID()),
    new TestEvent(randomUUID(), { testData: 'John' }, randomUUID())
  ]

  let publishedEvents = [
    new TestEvent(randomUUID(), { testData: 'John' }, randomUUID(), 3, 'PUBLISHED')
  ]

  // clear the outbox entirely first
  await prisma.event.deleteMany();
  await outbox.save(unprocessedEvents);
  await outbox.save(publishedEvents);

  return { unprocessedEvents, publishedEvents }
}

async function main () {
  await setupLab();
  await natsEventBus.initialize();
  relay.start();
}

main ();
