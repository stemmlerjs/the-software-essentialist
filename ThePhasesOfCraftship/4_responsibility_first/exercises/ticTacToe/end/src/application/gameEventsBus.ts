import { GameEvent } from '../domain/types';
import { GameEventSubscription } from './gameEventSubscriptions';
import { GameRepository } from '../infra/outgoing/gameRepository';

// Coordinator + Interfacer (outgoing)
export class GameEventBus {
  private events: GameEvent[] = [];
  private observers: GameEventSubscription[] = [];

  constructor(
    events: GameEvent[] = [],
    private repository: GameRepository
  ) {
    this.events = events;
  }

  // Coordinating
  addObserver(observer: GameEventSubscription) {
    this.observers.push(observer);
  }

  // Coordinating
  add(event: GameEvent) {
    this.events.push(event);
    this.observers.forEach(observer => observer.onEvent(event));
  }

  getAll(): GameEvent[] {
    return [...this.events];
  }

  // Interfacing
  async save(): Promise<void> {
    await this.repository.save(this.events);
  }

  static async load(repository: GameRepository): Promise<GameEventBus> {
    const events = await repository.load();
    return new GameEventBus(events, repository);
  }

  async clear(): Promise<void> {
    await this.repository.clear();
    this.events = [];
  }
} 