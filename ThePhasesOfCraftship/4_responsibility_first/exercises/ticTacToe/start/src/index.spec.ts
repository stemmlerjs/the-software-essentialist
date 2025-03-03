import { GameEvent, TicTacToe } from './index';

describe('TicTacToe', () => {
  let game: TicTacToe;

  beforeEach(() => {
    game = new TicTacToe();
  });

  it('should start with an empty board', () => {
    const state = game.getState();
    expect(state.board).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    expect(state.currentPlayer).toBe('X');
    expect(state.isGameOver).toBe(false);
    expect(state.winner).toBe(null);
  });

  it('should allow valid moves', () => {
    expect(game.makeMove({ row: 0, col: 0 })).toBe(true);
    const state = game.getState();
    expect(state.board[0][0]).toBe('X');
    expect(state.currentPlayer).toBe('O');
  });

  it('should not allow moves on occupied cells', () => {
    game.makeMove({ row: 0, col: 0 });
    expect(game.makeMove({ row: 0, col: 0 })).toBe(false);
  });

  it('should detect a row win', () => {
    game.makeMove({ row: 0, col: 0 }); // X
    game.makeMove({ row: 1, col: 0 }); // O
    game.makeMove({ row: 0, col: 1 }); // X
    game.makeMove({ row: 1, col: 1 }); // O
    game.makeMove({ row: 0, col: 2 }); // X

    const state = game.getState();
    expect(state.isGameOver).toBe(true);
    expect(state.winner).toBe('X');
  });

  it('should detect a column win', () => {
    game.makeMove({ row: 0, col: 0 }); // X
    game.makeMove({ row: 0, col: 1 }); // O
    game.makeMove({ row: 1, col: 0 }); // X
    game.makeMove({ row: 1, col: 1 }); // O
    game.makeMove({ row: 2, col: 0 }); // X

    const state = game.getState();
    expect(state.isGameOver).toBe(true);
    expect(state.winner).toBe('X');
  });

  it('should detect a diagonal win', () => {
    game.makeMove({ row: 0, col: 0 }); // X
    game.makeMove({ row: 0, col: 1 }); // O
    game.makeMove({ row: 1, col: 1 }); // X
    game.makeMove({ row: 0, col: 2 }); // O
    game.makeMove({ row: 2, col: 2 }); // X

    const state = game.getState();
    expect(state.isGameOver).toBe(true);
    expect(state.winner).toBe('X');
  });

  it('should replay events correctly', () => {
    const events: GameEvent[] = [
      { type: 'MOVE', player: 'X', position: { row: 0, col: 0 }, timestamp: 1 },
      { type: 'MOVE', player: 'O', position: { row: 1, col: 1 }, timestamp: 2 },
    ];

    const gameWithEvents = new TicTacToe(events);
    const state = gameWithEvents.getState();

    expect(state.board[0][0]).toBe('X');
    expect(state.board[1][1]).toBe('O');
    expect(state.currentPlayer).toBe('X');
  });
});
