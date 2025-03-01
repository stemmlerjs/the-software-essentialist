type EventHandler<T = any> = (data: T) => void;

export class EventEmitter {
  private handlers: Map<string, EventHandler[]> = new Map();

  on<T>(eventName: string, handler: EventHandler<T>) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);

    return () => {
      const handlers = this.handlers.get(eventName)!;
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    };
  }

  emit<T>(eventName: string, data: T) {
    const handlers = this.handlers.get(eventName);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
} 