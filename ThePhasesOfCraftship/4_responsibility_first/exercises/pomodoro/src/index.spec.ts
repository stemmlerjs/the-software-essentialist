import inquirer from 'inquirer';
import player from 'play-sound';

jest.mock('inquirer');
jest.mock('play-sound', () => {
  return () => ({
    play: jest.fn((file, cb) => cb(null))
  });
});

describe('Pomodoro Console App', () => {
  let mockStdin: any;
  
  beforeEach(() => {
    jest.spyOn(console, 'clear').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    jest.useFakeTimers();
    
    // Mock process.stdin
    mockStdin = {
      setRawMode: jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn()
    };
    Object.defineProperty(process, 'stdin', { value: mockStdin });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should run full pomodoro cycle with break', async () => {
    const mockPrompt = jest.spyOn(inquirer, 'prompt');
    // First prompt - start pomodoro
    mockPrompt.mockResolvedValueOnce({ action: 'start' });
    // Second prompt - start break
    mockPrompt.mockResolvedValueOnce({ action: 'start' });

    const app = new PomodoroConsoleApp();
    const pomodoroPromise = app.startPomodoro();
    
    // Work period
    jest.advanceTimersByTime(25 * 60 * 1000);
    
    // Break period
    jest.advanceTimersByTime(5 * 60 * 1000);
    
    await pomodoroPromise;
    
    expect(mockPrompt).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Work Period - Time remaining/));
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Break Time - Time remaining/));
    expect(console.log).toHaveBeenCalledWith('Break completed! Great job!');
  });

  it('should quit after pomodoro without break', async () => {
    const mockPrompt = jest.spyOn(inquirer, 'prompt');
    mockPrompt.mockResolvedValueOnce({ action: 'start' });
    mockPrompt.mockResolvedValueOnce({ action: 'quit' });

    const app = new PomodoroConsoleApp();
    const pomodoroPromise = app.startPomodoro();
    
    jest.advanceTimersByTime(25 * 60 * 1000);
    
    await pomodoroPromise;
    
    expect(mockPrompt).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Work Period - Time remaining/));
  });

  it('should handle pause key press during work period', async () => {
    const mockPrompt = jest.spyOn(inquirer, 'prompt');
    mockPrompt.mockResolvedValueOnce({ action: 'start' });

    const app = new PomodoroConsoleApp();
    const pomodoroPromise = app.startPomodoro();
    
    // Get the keypress handler
    const keypressHandler = mockStdin.on.mock.calls[0][1];
    
    // Simulate 'p' key press
    keypressHandler('', { name: 'p' });
    
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/pause \(p\) \| stop \(s\)/));
    
    await pomodoroPromise;
  });

  it('should handle stop key press during work period', async () => {
    const mockPrompt = jest.spyOn(inquirer, 'prompt');
    mockPrompt.mockResolvedValueOnce({ action: 'start' });

    const app = new PomodoroConsoleApp();
    const pomodoroPromise = app.startPomodoro();
    
    // Get the keypress handler
    const keypressHandler = mockStdin.on.mock.calls[0][1];
    
    // Simulate 's' key press
    keypressHandler('', { name: 's' });
    
    expect(process.exit).toHaveBeenCalledWith(0);
    
    await pomodoroPromise;
  });
}); 