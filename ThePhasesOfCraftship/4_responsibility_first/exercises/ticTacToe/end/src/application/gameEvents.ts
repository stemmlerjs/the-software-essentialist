
import { GameEvent } from '../domain/types';

// Interfacer (outgoing)
export class GameEvents {
  constructor(
    private events: GameEvent[] = []
  ) {}

  getAll(): GameEvent[] {
    return [...this.events];
  }

  add(event: GameEvent) {
    this.events.push(event);
  }
} 