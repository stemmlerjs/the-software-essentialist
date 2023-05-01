
import { Gateway } from "../shared/gateway";
import { TodosController } from "./todosController";
import { TodosPresenter } from "./todosPresenter";

describe('todosController', () => {
  
  describe('create todo', () => {

    test('creating a new todo when none exists', async () => {
      // Arrange
      let todoText = 'lets do something'
      let gateway = new Gateway();

      let todosPresenter = new TodosPresenter(gateway);
      let todosController = new TodosController(gateway);
  
      // Act
      await todosController.createTodo(todoText);
  
      // Assert
      let todos = todosPresenter.getAllTodos();
      expect(todos).toHaveLength(1);
      expect(todos[0].text).toEqual(todoText); 
      expect(todos[0].id).toBeDefined();
    })

  })

})