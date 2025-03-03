
import { GameEvent } from '../../domain/types';
import { GameRepository } from './gameRepository';

// Interfacer (outgoing)
export class GameEventStore {
  constructor(
    private events: GameEvent[] = [],
    private repository: GameRepository
  ) {}

  getAll(): GameEvent[] {
    return [...this.events];
  }

  add(event: GameEvent) {
    this.events.push(event);
  }

  async save(): Promise<void> {
    await this.repository.save(this.events);
  }

  static async load(repository: GameRepository): Promise<GameEventStore> {
    const events = await repository.load();
    return new GameEventStore(events, repository);
  }
} 