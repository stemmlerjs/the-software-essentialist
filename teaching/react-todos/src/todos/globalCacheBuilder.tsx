
import { GlobalCache } from '../shared/globalCache';
import { TodoDTO } from './todoDTO';

export class GlobalCacheBuilder {

  private todos: TodoDTO[] = [];

  withTodos (todos: TodoDTO[]) {
    this.todos = todos;
    return this;
  }

  build (): GlobalCache {
    return new GlobalCache({
      todos: this.todos
    });
  }
}