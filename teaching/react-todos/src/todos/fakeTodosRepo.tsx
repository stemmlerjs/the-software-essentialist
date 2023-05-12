
import { Gateway } from "../shared/gateway";
import { GlobalCache } from "../shared/globalCache";
import { GlobalCacheBuilder } from "./globalCacheBuilder";
import { Todo } from "./todo";
import { TodosRepo } from "./todosRepo";

export class FakeTodosRepo implements TodosRepo {

  private cache: GlobalCache;

  constructor (cache: GlobalCache) {
    this.cache = cache;
  }

  async createTodo(todo: Todo): Promise<"success" | "failure"> {
    this.cache.update({
      todos: [...this.cache.props.todos, { text: todo.getText(), id: ''}]
    });

    return 'success'
  }
}