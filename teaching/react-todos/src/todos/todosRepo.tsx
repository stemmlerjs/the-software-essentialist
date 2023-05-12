
import { Todo } from "./todo";

export interface TodosRepo {
  createTodo (todo: Todo): Promise<'success' | 'failure'>
}