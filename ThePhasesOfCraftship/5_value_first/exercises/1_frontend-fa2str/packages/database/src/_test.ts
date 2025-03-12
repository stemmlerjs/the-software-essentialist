
import { Config } from "@dddforum/config";
import { PrismaDatabase } from "./database";

const config = Config();

const database = new PrismaDatabase(config);

database.getConnection().event.create({
  data: {
    aggregateId: "test-aggregate-id",
    name: "TestEvent",
    data: JSON.stringify({ test: "data" })
  }
}).then(() => {
  console.log('done');
}).catch((err) => {
  console.log(err);
})