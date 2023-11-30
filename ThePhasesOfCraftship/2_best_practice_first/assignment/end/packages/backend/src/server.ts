
export class Server {

  private state: 'stopped' | 'started';

  constructor () {
    this.state = 'stopped';

  }

  async start () {
    
  }

  async stop () {

  }

  isStarted () {
    return this.state === 'started';
  }
}