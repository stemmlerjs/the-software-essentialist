import { GameEvent } from '../domain/types';
import { GameEventSubscription } from './gameEventSubscriptions';
import { GameEventStore } from '../infra/outgoing/gameEventStore';

// Coordinator
export class GameEventCoordinator {
  private observers: GameEventSubscription[] = [];

  constructor(private eventStore: GameEventStore) {}

  addObserver(observer: GameEventSubscription) {
    this.observers.push(observer);
  }

  add(event: GameEvent) {
    this.eventStore.add(event);
    this.observers.forEach(observer => observer.onEvent(event));
  }

  getAll(): GameEvent[] {
    return this.eventStore.getAll();
  }

  async save(): Promise<void> {
    await this.eventStore.save();
  }
} 