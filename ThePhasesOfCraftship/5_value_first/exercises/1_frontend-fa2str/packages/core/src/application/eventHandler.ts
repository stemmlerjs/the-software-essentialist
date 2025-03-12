export interface IHandle<T> {
  handle (event: T): Promise<void>;
}