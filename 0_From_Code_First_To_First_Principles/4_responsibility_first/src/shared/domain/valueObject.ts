
export abstract class ValueObject<State> {
  
  private state: State;

  constructor (state: State) {
    this.state = state
  }

  getValue () {
    return this.state;
  }
}