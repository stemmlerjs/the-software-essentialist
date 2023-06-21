
import { AggregateRoot } from "../../../domain/aggregateRoot";

export abstract class Repository<Entity extends AggregateRoot> {

  async saveAndPublishEvents (aggregate: Entity): Promise<void> {

  }
}
