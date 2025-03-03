import { GameEvent } from '../domain/types';
import { GameEvents } from './gameEvents';
import { GameEventSubscription } from './gameEventSubscriptions';

// Coordinator (coordinates)
export class GameEventCoordinator {
  private observers: GameEventSubscription[] = [];

  constructor(private gameEvents: GameEvents) {}

  addObserver(observer: GameEventSubscription) {
    this.observers.push(observer);
  }

  add(event: GameEvent) {
    this.gameEvents.add(event);
    this.observers.forEach(observer => observer.onEvent(event));
  }

  getAll(): GameEvent[] {
    return this.gameEvents.getAll();
  }
} 