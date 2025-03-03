import { Board } from './board';
import { Cell, Player } from "./types";
import { config } from '../config';

// Service provider
export class GameStateValidator {

  static isGameOver(board: Board): { isOver: boolean; winner: Player | null } {
    // Check rows
    for (let row = 0; row < config.boardSize; row++) {
      const rowCells = Array(config.boardSize)
        .fill(null)
        .map((_, col) => board.get({ row, col }));
      if (this.checkLine(rowCells)) {
        return { isOver: true, winner: rowCells[0] as Player };
      }
    }

    // Check columns
    for (let col = 0; col < config.boardSize; col++) {
      const colCells = Array(config.boardSize)
        .fill(null)
        .map((_, row) => board.get({ row, col }));
      if (this.checkLine(colCells)) {
        return { isOver: true, winner: colCells[0] as Player };
      }
    }

    // Check diagonals
    const diagonal1 = Array(config.boardSize)
      .fill(null)
      .map((_, i) => board.get({ row: i, col: i }));
    if (this.checkLine(diagonal1)) {
      return { isOver: true, winner: diagonal1[0] as Player };
    }

    const diagonal2 = Array(config.boardSize)
      .fill(null)
      .map((_, i) => board.get({ row: i, col: config.boardSize - 1 - i }));
    if (this.checkLine(diagonal2)) {
      return { isOver: true, winner: diagonal2[0] as Player };
    }

    if (board.isFull()) {
      return { isOver: true, winner: null };
    }

    return { isOver: false, winner: null };
  }

  private static checkLine(cells: Cell[]): boolean {
    return cells[0] !== null && cells.every(cell => cell === cells[0]);
  }
} 