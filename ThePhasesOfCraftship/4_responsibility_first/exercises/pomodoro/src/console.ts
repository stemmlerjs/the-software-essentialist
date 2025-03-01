import readline from 'readline';
import { Screen } from './screen';
import { PauseCommand, StopCommand, QuitCommand } from './commands';
import { CommandHandler } from './command-handler';

export class Console {
  private removeKeyHandlers: (() => void) | null = null;

  constructor(private commandHandler: CommandHandler) {
    this.setupKeyHandlers();
  }

  private setupKeyHandlers() {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    readline.emitKeypressEvents(process.stdin);

    process.stdin.on('keypress', (str: string, key: { name: string; ctrl: boolean }) => {
      if (key.ctrl && key.name === 'c') {
        this.commandHandler.handle(new QuitCommand());
      } else if (key.name === 'p') {
        this.commandHandler.handle(new PauseCommand(false));
      } else if (key.name === 's') {
        this.commandHandler.handle(new StopCommand());
      }
    });
  }

  render(screen: Screen) {
    console.clear();
    screen.content.forEach(line => console.log(line));
  }

  cleanup() {
    if (this.removeKeyHandlers) {
      this.removeKeyHandlers();
    }
  }
} 
