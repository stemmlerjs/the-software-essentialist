
import { Todo } from "./todo";
import { TodosRepo } from "./todosRepo";

export class TodosController {
  constructor (private todosRepo: TodosRepo) {
  }

  async createTodo (text: string): Promise<'Success' | 'InvalidTodo'> {
    let todo = Todo.create({ text }) as Todo;
    await this.todosRepo.createTodo(todo);
    return 'Success';
  }
}