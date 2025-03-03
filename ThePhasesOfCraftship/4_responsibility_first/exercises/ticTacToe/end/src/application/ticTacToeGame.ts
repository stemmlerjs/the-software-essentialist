import { GameState, GameStateData } from '../domain/gameState';
import { GameEvent, Position } from '../domain/types';
import { GameRepository } from '../infra/outgoing/gameRepository';
import { GameEventCoordinator } from './gameEventCoordinator';
import { GameEvents } from './gameEvents';
import { GameEventSubscriptions } from './gameEventSubscriptions';

// Application / Controller (command-based)
export class TicTacToe {
  private state: GameState;
  private gameEvents: GameEvents;
  private eventCoordinator: GameEventCoordinator;

  constructor(
    events: GameEvent[] = [], 
    private repository: GameRepository
  ) {
    this.state = new GameState();
    this.gameEvents = new GameEvents(events);

    this.eventCoordinator = new GameEventCoordinator(this.gameEvents);
    this.eventCoordinator.addObserver(new GameEventSubscriptions(this.state));

    this.replayEvents(events);
  }

  private replayEvents(events: GameEvent[]) {
    events.forEach(event => this.eventCoordinator.add(event));
  }

  makeMove(position: Position): boolean {
    if (!this.state.canMakeMove(position)) {
      return false;
    }

    this.eventCoordinator.add({
      type: 'MOVE',
      player: this.state.currentPlayer,
      position,
      timestamp: Date.now()
    });
    return true;
  }

  async saveGame() {
    const events = this.gameEvents.getAll()
    await this.repository.save(events);
  }

  async clearGame() {
    await this.repository.clear();
  }

  getState(): GameStateData {
    return this.state.getSnapshot();
  }

  printBoard() {
    console.log('\nCurrent Board:');
    console.log(this.state.getBoard().toString());
    console.log();
  }
}