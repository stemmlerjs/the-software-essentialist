import { GameStateValidator } from './gameStateValidator';
import { Board } from './board';
import { Cell, GameEvent, Player, Position } from './types';
import { config } from '../config';

export interface GameStateData {
  board: Cell[][];
  currentPlayer: Player;
  isGameOver: boolean;
  winner: Player | null;
}

// Structurer
export class GameState {
  private board: Board;
  currentPlayer: Player;
  isGameOver: boolean;
  winner: Player | null;

  constructor() {
    this.board = new Board();
    this.currentPlayer = config.players.first;
    this.isGameOver = false;
    this.winner = null;
  }

  canMakeMove(position: Position): boolean {
    return !this.isGameOver && !this.board.isOccupied(position);
  }

  getBoard(): Board {
    return this.board;
  }

  applyEvent(event: GameEvent) {
    const { player, position } = event;
    this.board.place(position, player);
    this.currentPlayer = player === config.players.first 
      ? config.players.second 
      : config.players.first;
    
    const { isOver, winner } = GameStateValidator.isGameOver(this.board);
    this.isGameOver = isOver;
    this.winner = winner;
  }

  getSnapshot(): GameStateData {
    return {
      board: this.board.getAll(),
      currentPlayer: this.currentPlayer,
      isGameOver: this.isGameOver,
      winner: this.winner
    };
  }
}