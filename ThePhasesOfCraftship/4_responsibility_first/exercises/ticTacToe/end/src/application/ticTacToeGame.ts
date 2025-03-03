import { GameState, GameStateData } from '../domain/gameState';
import { GameEvent, Position } from '../domain/types';
import { GameEventStore } from '../infra/outgoing/gameEventStore';
import { GameRepository } from '../infra/outgoing/gameRepository';
import { GameEventCoordinator } from './gameEventCoordinator';
import { GameEventSubscriptions } from './gameEventSubscriptions';

// Application / Controller (command-based)
export class TicTacToe {
  private state: GameState;
  private eventStore: GameEventStore;
  private eventCoordinator: GameEventCoordinator;

  constructor(
    events: GameEvent[] = [], 
    private repository: GameRepository
  ) {
    this.state = new GameState();
    this.eventStore = new GameEventStore(events, repository);
    this.eventCoordinator = new GameEventCoordinator(this.eventStore);
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
    await this.eventCoordinator.save();
  }

  async clearGame() {
    await this.repository.clear();
  }

  static async loadGame(repository: GameRepository): Promise<TicTacToe> {
    const events = await repository.load();
    return new TicTacToe(events, repository);
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