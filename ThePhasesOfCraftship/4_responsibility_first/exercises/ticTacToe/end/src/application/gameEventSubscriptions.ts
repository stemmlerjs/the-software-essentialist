
import { GameState } from '../domain/gameState';
import { GameEvent } from '../domain/types';

export interface GameEventSubscription {
  onEvent(event: GameEvent): void;
}

// Controller (event-based)
export class GameEventSubscriptions implements GameEventSubscription {
  constructor(private state: GameState) {}

  // On any event that occurred, let's apply it to the game state
  onEvent(event: GameEvent): void {
    this.state.applyEvent(event);
  }
} 