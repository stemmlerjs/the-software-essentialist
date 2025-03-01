import { Clock } from './clock';
import { EventEmitter } from './events';
import { Events, SecondElapsedEvent, SessionEndedEvent, SessionPausedEvent } from './pomodoro-events';
import { Command, PauseCommand, StopCommand, QuitCommand } from './commands';

export class PomodoroApp {
  private readonly WORK_MINUTES = 25;
  private readonly BREAK_MINUTES = 5;
  private clock: Clock;
  private currentLabel: string = '';

  constructor(private readonly events: EventEmitter) {
    this.clock = new Clock(() => {
      this.events.emit<SessionEndedEvent>(Events.SESSION_ENDED, {
        reason: 'completed',
        label: this.currentLabel
      });
    });
  }

  handleCommand(command: Command) {
    switch (command.type) {
      case 'PAUSE':
        const pauseCommand = command as PauseCommand;
        if (this.clock.isPausedState()) {
          this.clock.resume();
        } else {
          this.clock.pause();
        }
        this.events.emit<SessionPausedEvent>(Events.SESSION_PAUSED, {
          isPaused: this.clock.isPausedState(),
          label: this.currentLabel,
          secondsRemaining: this.clock.getTimeLeft()
        });
        break;

      case 'STOP':
        this.events.emit<SessionEndedEvent>(Events.SESSION_ENDED, {
          reason: 'stopped',
          label: this.currentLabel
        });
        this.cleanup();
        break;

      case 'QUIT':
        this.cleanup();
        break;
    }
  }

  async startWorkPeriod(): Promise<void> {
    this.currentLabel = 'Work Period';
    return this.startTimer(this.WORK_MINUTES);
  }

  async startBreakPeriod(): Promise<void> {
    this.currentLabel = 'Break Time';
    return this.startTimer(this.BREAK_MINUTES);
  }

  private async startTimer(durationInMinutes: number): Promise<void> {
    return new Promise<void>((resolve) => {
      const unsubscribe = this.clock.subscribe((seconds) => {
        this.events.emit<SecondElapsedEvent>(Events.SECOND_ELAPSED, {
          secondsRemaining: seconds,
          label: this.currentLabel,
          isPaused: this.clock.isPausedState()
        });
      });

      this.clock.setOnComplete(() => {
        unsubscribe();
        resolve();
      });

      this.clock.start(durationInMinutes);
    });
  }

  cleanup() {
    this.clock.stop();
  }
} 