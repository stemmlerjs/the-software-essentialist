import inquirer from 'inquirer';

jest.mock('inquirer');

describe('Pomodoro Start Prompt', () => {
  beforeEach(() => {
    jest.spyOn(console, 'clear').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should clear console and prompt user to start', async () => {
    const mockPrompt = jest.spyOn(inquirer, 'prompt');
    mockPrompt.mockResolvedValueOnce({ action: 'start' });

    const { startPomodoro } = require('./index');
    
    const pomodoroPromise = startPomodoro();
    
    expect(console.clear).toHaveBeenCalled();
    expect(mockPrompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: 'list',
        message: 'Ready to start some pomodoros?',
        choices: [
          expect.objectContaining({ value: 'start', key: 'y' }),
          expect.objectContaining({ value: 'quit', key: 'q' })
        ]
      })
    ]);

    // Fast-forward time to complete the timer
    jest.advanceTimersByTime(25 * 60 * 1000);
    
    await pomodoroPromise;
    
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Time remaining: \d{2}:\d{2}/));
    expect(console.log).toHaveBeenCalledWith('Pomodoro completed!');
  });

  it('should exit when user chooses to quit', async () => {
    const mockPrompt = jest.spyOn(inquirer, 'prompt');
    mockPrompt.mockResolvedValueOnce({ action: 'quit' });

    const { startPomodoro } = require('./index');
    
    await startPomodoro();
    
    expect(console.log).toHaveBeenCalledWith('Maybe next time!');
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('should format time correctly', () => {
    const { formatTime } = require('./index');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(3600)).toBe('60:00');
    expect(formatTime(0)).toBe('00:00');
  });
}); 