import inquirer from 'inquirer';
import player from 'play-sound';
import { Console } from './console';
import { TimerScreen } from './screen';
import { EventEmitter } from './events';
import { Events, SecondElapsedEvent, SessionEndedEvent } from './pomodoro-events';
import { CommandHandler } from './command-handler';
import { PomodoroApp } from './pomodoro-app';

const audioPlayer = player({});

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

class PomodoroConsoleApp {
  private console: Console;
  private events: EventEmitter;
  private app: PomodoroApp;
  private commandHandler: CommandHandler;

  constructor() {
    this.events = new EventEmitter();
    this.app = new PomodoroApp(this.events);
    
    this.commandHandler = new CommandHandler(
      this.app,
      () => this.cleanup()
    );

    this.console = new Console(this.commandHandler);
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.events.on<SecondElapsedEvent>(Events.SECOND_ELAPSED, (event) => {
      const screen = new TimerScreen(
        event.label,
        formatTime(event.secondsRemaining),
        event.isPaused
      );
      this.console.render(screen);
    });

    this.events.on<SessionEndedEvent>(Events.SESSION_ENDED, async (event) => {
      if (event.reason === 'completed') {
        await this.playNotification();
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

  async startPomodoro() {
    console.clear();
    
    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Ready to start some pomodoros?',
      choices: [
        { name: 'Yes (y)', value: 'start', key: 'y' },
        { name: 'Quit (q)', value: 'quit', key: 'q' }
      ]
    }]);

    if (answer.action === 'start') {
      await this.app.startWorkPeriod();

      const startBreak = await this.promptForBreak();
      
      if (startBreak) {
        await this.app.startBreakPeriod();
        console.log('Break completed! Great job!');
      }
    } else {
      console.log('Maybe next time!');
      process.exit(0);
    }
  }

  cleanup() {
    this.app.cleanup();
    this.console.cleanup();
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
}

if (require.main === module) {
  const app = new PomodoroConsoleApp();
  app.startPomodoro().catch(console.error);
}

export { PomodoroConsoleApp };
