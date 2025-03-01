type Observer = (seconds: number) => void;

export class Clock {
  private observers: Observer[] = [];
  private timer: NodeJS.Timeout | null = null;
  private secondsLeft: number = 0;
  private onCompleteHandler?: () => void;
  private isPaused: boolean = false;

  constructor(onComplete?: () => void) {
    this.onCompleteHandler = onComplete;
  }

  setOnComplete(handler: () => void) {
    this.onCompleteHandler = handler;
  }

  subscribe(observer: Observer): () => void {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }

  private notify() {
    this.observers.forEach(observer => observer(this.secondsLeft));
  }

  start(durationInMinutes: number) {
    this.secondsLeft = durationInMinutes * 60;
    
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      this.secondsLeft--;
      this.notify();

      if (this.secondsLeft < 0) {
        this.stop();
        if (this.onCompleteHandler) {
          this.onCompleteHandler();
        }
      }
    }, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getTimeLeft(): number {
    return this.secondsLeft;
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.isPaused = true;
    }
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.start(this.secondsLeft / 60);
    }
  }

  isPausedState(): boolean {
    return this.isPaused;
  }
}
