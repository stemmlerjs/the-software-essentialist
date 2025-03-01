export interface Screen {
  content: string[];
}

export class TimerScreen implements Screen {
  constructor(
    public readonly label: string,
    public readonly timeRemaining: string,
    public readonly isPaused: boolean
  ) {}

  get content(): string[] {
    return [
      `${this.label} - Time remaining: ${this.timeRemaining}`,
      '------',
      `${this.isPaused ? 'resume' : 'pause'} (p) | stop (s)`
    ];
  }
}

export class PromptScreen implements Screen {
  constructor(
    public readonly message: string,
    public readonly options: { name: string; key: string }[]
  ) {}

  get content(): string[] {
    return [
      this.message,
      '------',
      ...this.options.map(opt => opt.name)
    ];
  }
} 