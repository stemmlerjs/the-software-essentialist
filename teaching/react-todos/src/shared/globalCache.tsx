
import { TodoDTO } from "../todos/todoDTO";

interface GlobalCacheProps { 
  todos: TodoDTO[] 
}

export class GlobalCache {
  public props: GlobalCacheProps;

  constructor (props: GlobalCacheProps) {
    this.props = props;
  }

  update (updatedProps: Partial<GlobalCacheProps>) {
    this.props = {
      ...this.props,
      ...updatedProps
    };
  }

}

