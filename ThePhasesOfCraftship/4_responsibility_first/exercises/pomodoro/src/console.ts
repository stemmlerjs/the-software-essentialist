import readline from 'readline';
import { Screen } from './screen';

export type KeyHandler = (key: { name: string; ctrl: boolean }) => void;

export class Console {
  private removeKeyHandlers: (() => void) | null = null;

  constructor(private readonly keyHandler: KeyHandler) {
    this.setupKeyHandlers();
  }

  private setupKeyHandlers() {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    readline.emitKeypressEvents(process.stdin);

    const handler = (str: string, key: { name: string; ctrl: boolean }) => {
      this.keyHandler(key);
    };

    process.stdin.on('keypress', handler);
    this.removeKeyHandlers = () => {
      process.stdin.removeListener('keypress', handler);
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
    };
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


const c = new Console((key) => {
  const quitDetected = key.ctrl && key.name === "c";
  if (quitDetected) {
    process.exit(0)
  }
  
  console.log(key)
})