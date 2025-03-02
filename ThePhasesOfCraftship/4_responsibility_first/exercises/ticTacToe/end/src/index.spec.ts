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

  it('should detect a tie', () => {
    // Fill board with a pattern that results in a tie
    const moves = [
      [0, 0], // X
      [0, 1], // O
      [1, 1], // X
      [2, 2], // O
      [1, 0], // O
      [2, 0], // X
      [0, 2], // X
      [1, 2], // X
      [2, 1], // O
    ];

    moves.forEach(([row, col]) => {
      game.makeMove({ row, col });
    });

    const state = game.getState();
    expect(state.isGameOver).toBe(true);
    expect(state.winner).toBe(null);
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
