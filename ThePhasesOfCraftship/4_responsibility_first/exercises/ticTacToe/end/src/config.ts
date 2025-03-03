import path from 'path';

export interface GameConfig {
  saveFilePath: string;
  boardSize: number;
  players: {
    first: 'X';
    second: 'O';
  };
}

export const config: GameConfig = {
  saveFilePath: path.join(__dirname, '../gameState.json'),
  boardSize: 3,
  players: {
    first: 'X',
    second: 'O'
  }
}; 