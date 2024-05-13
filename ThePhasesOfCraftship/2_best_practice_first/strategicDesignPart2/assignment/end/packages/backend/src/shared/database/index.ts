import { PrismaClient } from "@prisma/client";
import { Database } from "./database";

const prisma = new PrismaClient();
const database = new Database(prisma);

export {
    Database,
    prisma,
    database
}
