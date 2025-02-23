

import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { MessageRelay } from "./relay";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const eventsTable = new EventOutboxTable(prisma);
const messageRelay = new MessageRelay(eventsTable);
messageRelay.start();
