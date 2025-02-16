
export interface EventHandler<T> {
  handle (event: T): Promise<void>;
}
