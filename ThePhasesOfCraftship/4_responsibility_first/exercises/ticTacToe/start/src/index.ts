import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';

// Types
type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[][];
type Position = { row: number; col: number };

export interface GameEvent {
  type: 'MOVE';
  player: Player;
  position: Position;
  timestamp: number;
}

interface GameState {
  board: Board;
  currentPlayer: Player;
  isGameOver: boolean;
  winner: Player | null;
}

// Constants
const SAVE_FILE = path.join(__dirname, '../gameState.json');
const INITIAL_STATE: GameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  currentPlayer: 'X',
  isGameOver: false,
  winner: null
};

// Game Logic
export class TicTacToe {
  private state: GameState;
  private events: GameEvent[] = [];

  constructor(events: GameEvent[] = []) {
    this.state = INITIAL_STATE;
    this.replayEvents(events);
  }

  private replayEvents(events: GameEvent[]) {
    events.forEach(event => this.applyEvent(event));
  }

  private applyEvent(event: GameEvent) {
    const { player, position } = event;
    this.state.board[position.row][position.col] = player;
    this.state.currentPlayer = player === 'X' ? 'O' : 'X';
    this.checkGameOver();
  }

  private checkGameOver() {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (this.checkLine(this.state.board[row][0], this.state.board[row][1], this.state.board[row][2])) {
        this.state.winner = this.state.board[row][0] as Player;
        this.state.isGameOver = true;
        return;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (this.checkLine(this.state.board[0][col], this.state.board[1][col], this.state.board[2][col])) {
        this.state.winner = this.state.board[0][col] as Player;
        this.state.isGameOver = true;
        return;
      }
    }

    // Check diagonals
    if (this.checkLine(this.state.board[0][0], this.state.board[1][1], this.state.board[2][2])) {
      this.state.winner = this.state.board[0][0] as Player;
      this.state.isGameOver = true;
      return;
    }

    if (this.checkLine(this.state.board[0][2], this.state.board[1][1], this.state.board[2][0])) {
      this.state.winner = this.state.board[0][2] as Player;
      this.state.isGameOver = true;
      return;
    }

    // Check for tie
    if (this.isBoardFull()) {
      this.state.isGameOver = true;
    }
  }

  private checkLine(a: Cell, b: Cell, c: Cell): boolean {
    return a !== null && a === b && b === c;
  }

  private isBoardFull(): boolean {
    return this.state.board.every(row => row.every(cell => cell !== null));
  }

  makeMove(position: Position): boolean {
    if (this.state.isGameOver || this.state.board[position.row][position.col] !== null) {
      return false;
    }

    const event: GameEvent = {
      type: 'MOVE',
      player: this.state.currentPlayer,
      position,
      timestamp: Date.now()
    };

    this.applyEvent(event);
    this.events.push(event);
    return true;
  }

  async saveGame() {
    await fs.writeFile(SAVE_FILE, JSON.stringify(this.events));
  }

  static async loadGame(): Promise<TicTacToe> {
    try {
      const data = await fs.readFile(SAVE_FILE, 'utf-8');
      const events = JSON.parse(data) as GameEvent[];
      return new TicTacToe(events);
    } catch {
      return new TicTacToe();
    }
  }

  getState(): GameState {
    return { ...this.state };
  }

  printBoard() {
    console.log('\nCurrent Board:');
    this.state.board.forEach((row, i) => {
      console.log(row.map(cell => cell || ' ').join(' | '));
      if (i < 2) console.log('---------');
    });
    console.log();
  }
}

// Game Runner
async function runGame(resume: boolean = false) {
  const game = resume ? await TicTacToe.loadGame() : new TicTacToe();

  while (!game.getState().isGameOver) {
    game.printBoard();
    const state = game.getState();
    
    const { row, col } = await inquirer.prompt([
      {
        type: 'number',
        name: 'row',
        message: `Player ${state.currentPlayer}, enter row (0-2):`,
        validate: (input) => input >= 0 && input <= 2
      },
      {
        type: 'number',
        name: 'col',
        message: `Player ${state.currentPlayer}, enter column (0-2):`,
        validate: (input) => input >= 0 && input <= 2
      }
    ]);

    if (game.makeMove({ row, col })) {
      await game.saveGame();
    } else {
      console.log('Invalid move! Try again.');
    }
  }

  game.printBoard();
  const state = game.getState();
  
  if (state.winner) {
    console.log(`Player ${state.winner} wins!`);
  } else {
    console.log("It's a tie!");
  }

  // Clear saved game state
  await fs.unlink(SAVE_FILE).catch(() => {});
}

// CLI Entry Point
if (require.main === module) {
  const resume = process.argv.includes('--resume');
  runGame(resume).catch(console.error);
}
