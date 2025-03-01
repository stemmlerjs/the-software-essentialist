import inquirer from 'inquirer';
import player from 'play-sound';
import { Clock } from './clock';
import { Console } from './console';
import { TimerScreen, PromptScreen } from './screen';

const audioPlayer = player({});

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

class PomodoroConsoleApp {
  private readonly WORK_MINUTES = 25;
  private readonly BREAK_MINUTES = 5;
  private clock: Clock;
  private console: Console;
  private unsubscribe: (() => void) | null = null;

  constructor() {
    this.clock = new Clock(() => {
      this.playNotification().catch(console.error);
    });

    this.console = new Console((key) => {
      if (key.ctrl && key.name === 'c') {
        this.cleanup();
        process.exit(0);
      } else if (key.name === 'p') {
        if (this.clock.isPausedState()) {
          this.clock.resume();
        } else {
          this.clock.pause();
        }
      } else if (key.name === 's') {
        this.cleanup();
        process.exit(0);
      }
    });
  }

  private async playNotification() {
    return new Promise<void>((resolve) => {
      audioPlayer.play('assets/bell.wav', (err) => {
        if (err) console.error('Error playing sound:', err);
        resolve();
      });
    });
  }

  private async startTimer(durationInMinutes: number, label: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.unsubscribe = this.clock.subscribe((seconds) => {
        const screen = new TimerScreen(
          label,
          formatTime(seconds),
          this.clock.isPausedState()
        );
        this.console.render(screen);
      });

      this.clock.setOnComplete(() => {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
        resolve();
      });

      this.clock.start(durationInMinutes);
    });
  }

  private async promptForBreak(): Promise<boolean> {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Pomodoro completed! Ready for a break?',
        choices: [
          { name: 'Start Break (s)', value: 'start', key: 's' },
          { name: 'Quit (q)', value: 'quit', key: 'q' }
        ]
      }
    ]);

    return answer.action === 'start';
  }

  async startPomodoro() {
    console.clear();
    
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Ready to start some pomodoros?',
        choices: [
          { name: 'Yes (y)', value: 'start', key: 'y' },
          { name: 'Quit (q)', value: 'quit', key: 'q' }
        ]
      }
    ]);

    if (answer.action === 'start') {
      // Work period
      await this.startTimer(this.WORK_MINUTES, 'Work Period');

      // Prompt for break
      const startBreak = await this.promptForBreak();
      
      if (startBreak) {
        // Break period
        await this.startTimer(this.BREAK_MINUTES, 'Break Time');
        console.log('Break completed! Great job!');
      }
    } else {
      console.log('Maybe next time!');
      process.exit(0);
    }
  }

  cleanup() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.clock.stop();
    this.console.cleanup();
  }
}

if (require.main === module) {
  const app = new PomodoroConsoleApp();
  app.startPomodoro().catch(console.error);
}

export { PomodoroConsoleApp };
