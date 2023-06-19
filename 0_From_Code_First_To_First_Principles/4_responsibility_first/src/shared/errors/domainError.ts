
type DomainErrorType = 'MissingValue' | 'ValidationError' 

interface DomainErrorState {
  errorType: DomainErrorType;
  message: string;
}

export abstract class DomainError {
  private state: DomainErrorState;

  constructor (state: DomainErrorState) {
    this.state = state;
  }

  getErrorType (): string {
    return this.state.errorType;
  }

  getMessage (): string {
    return this.state.message
  }
}


