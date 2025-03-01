import { Command } from './commands';
import { PomodoroApp } from './pomodoro-app';

export class CommandHandler {
  constructor(
    private readonly app: PomodoroApp,
    private readonly cleanup: () => void
  ) {}

  handle(command: Command) {
    this.app.handleCommand(command);
    
    if (command.type === 'QUIT' || command.type === 'STOP') {
      this.cleanup();
      process.exit(0);
    }
  }
} 