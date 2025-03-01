export interface SecondElapsedEvent {
  secondsRemaining: number;
  label: string;
  isPaused: boolean;
}

export interface SessionEndedEvent {
  reason: 'completed' | 'stopped';
  label: string;
}

export interface SessionPausedEvent {
  isPaused: boolean;
  label: string;
  secondsRemaining: number;
}

export const Events = {
  SECOND_ELAPSED: 'SECOND_ELAPSED',
  SESSION_ENDED: 'SESSION_ENDED',
  SESSION_PAUSED: 'SESSION_PAUSED'
} as const; 