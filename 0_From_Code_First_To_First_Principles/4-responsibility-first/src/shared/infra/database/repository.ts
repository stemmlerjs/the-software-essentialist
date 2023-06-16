
import { AggregateRoot } from "../../domain/aggregateRoot";

export abstract class Repository<U extends AggregateRoot> {

  async saveAndPublishEvents (aggregate: U): Promise<void> {

  }
}
