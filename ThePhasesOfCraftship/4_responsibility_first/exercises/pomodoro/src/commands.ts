export interface Command {
  type: string;
  execute(): void;
}

export class PauseCommand implements Command {
  type = 'PAUSE';
  constructor(private readonly isPaused: boolean) {}
  
  execute() {
    if (this.isPaused) {
      // Resume logic will be handled by command handler
    } else {
      // Pause logic will be handled by command handler
    }
  }
}

export class StopCommand implements Command {
  type = 'STOP';
  execute() {
    // Stop logic will be handled by command handler
  }
}

export class QuitCommand implements Command {
  type = 'QUIT';
  constructor () {
    console.log('creating quit command')
  }
  execute() {
    // Quit logic will be handled by command handler
  }
}

export type CommandType = PauseCommand | StopCommand | QuitCommand; 