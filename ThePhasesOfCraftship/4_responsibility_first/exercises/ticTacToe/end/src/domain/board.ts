import { Cell, Position } from './types';
import { config } from '../config';


// Information holder
export class Board {
  private cells: Cell[][];

  constructor() {
    this.cells = Array(config.boardSize).fill(null)
      .map(() => Array(config.boardSize).fill(null));
  }

  isOccupied(position: Position): boolean {
    return this.cells[position.row][position.col] !== null;
  }

  place(position: Position, value: Cell): void {
    this.cells[position.row][position.col] = value;
  }

  get(position: Position): Cell {
    return this.cells[position.row][position.col];
  }

  getAll(): Cell[][] {
    return [...this.cells.map(row => [...row])];
  }

  isFull(): boolean {
    return this.cells.every(row => row.every(cell => cell !== null));
  }

  toString(): string {
    const rows = this.cells.map(row => 
      row.map(cell => cell || ' ').join(' | ')
    );
    
    const separator = '-'.repeat(rows[0].length);
    
    return rows.join(`\n${separator}\n`);
  }
} 