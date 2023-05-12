import { GlobalCache } from "../shared/globalCache";
import { TodoDTO } from "./todoDTO";
import { TodoViewModel } from "./todoViewModel";


export class TodosPresenter {

  constructor (private cache: GlobalCache) {

  }

  getAllTodos () {
    return this.cache.props.todos.map((todoDTO) => this.mapToViewModel(todoDTO))
  }

  mapToViewModel (todoDTO: TodoDTO): TodoViewModel {
    return new TodoViewModel(todoDTO);
  }

  
}