import inquirer from 'inquirer';
import { TicTacToe } from '../../application/ticTacToeGame';
import { Position } from '../../domain/types';
import { config } from '../../config';
import { FileSystemGameRepository } from '../outgoing/filesystemGameRepository';

// Interfacer (incoming)
export class GameRunnerCLI {
  private constructor(private game: TicTacToe) {}

  public static async create(resume: boolean) {
    const repository = new FileSystemGameRepository();
    const game = resume 
      ? await TicTacToe.loadGame(repository) 
      : new TicTacToe([], repository);
    return new GameRunnerCLI(game);
  }

  private async promptMove(): Promise<Position> {
    const state = this.game.getState();
    const maxIndex = config.boardSize - 1;
    const { row, col } = await inquirer.prompt([
      {
        type: 'number',
        name: 'row',
        message: `Player ${state.currentPlayer}, enter row (0-${maxIndex}):`,
        validate: (input) => input >= 0 && input <= maxIndex
      },
      {
        type: 'number',
        name: 'col',
        message: `Player ${state.currentPlayer}, enter column (0-${maxIndex}):`,
        validate: (input) => input >= 0 && input <= maxIndex
      }
    ]);
    return { row, col };
  }

  async run() {
    while (!this.game.getState().isGameOver) {
      this.game.printBoard();
      
      const position = await this.promptMove();
      if (this.game.makeMove(position)) {
        await this.game.saveGame();
      } else {
        console.log('Invalid move! Try again.');
      }
    }

    this.game.printBoard();
    const state = this.game.getState();
    
    if (state.winner) {
      console.log(`Player ${state.winner} wins!`);
    } else {
      console.log("It's a tie!");
    }

    // Clear saved game state
    await this.game.clearGame();
  }
}