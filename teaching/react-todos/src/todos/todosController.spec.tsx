
import { TodosController } from "./todosController";
import { TodosPresenter } from "./todosPresenter";
import { FakeTodosRepo } from "./fakeTodosRepo";
import { GlobalCacheBuilder } from "./globalCacheBuilder";
import { GlobalCache } from "../shared/globalCache";

describe("todosController", () => {
  describe("create todo", () => {

    let todoText: string;
    let cache: GlobalCache;
    let todosRepo: FakeTodosRepo;

    beforeEach(() => {
      todoText = "lets do something";
      cache = new GlobalCache({ todos: [] });
      todosRepo = new FakeTodosRepo(cache);
    })

    test("creating a new todo when none exists", async () => {
      let todosPresenter = new TodosPresenter(cache);
      let todosController = new TodosController(todosRepo);

      await todosController.createTodo(todoText);

      let todos = todosPresenter.getAllTodos();
      expect(todos).toHaveLength(1);
      expect(todos[0].getText()).toEqual(todoText);
      expect(todos[0].getId()).toBeDefined();
    });

    test("adding a todo to an existing list", async () => {
      cache = new GlobalCacheBuilder()
        .withTodos([
          { id: '1', text: "Clear list" },
          { id: '2', text: "Go home" },
        ])
        .build();
      let todosRepo = new FakeTodosRepo(cache);
      let todosPresenter = new TodosPresenter(cache);
      let todosController = new TodosController(todosRepo);

      await todosController.createTodo(todoText);
      
      let todos = todosPresenter.getAllTodos();
      expect(todos).toHaveLength(3);
      expect(todos[0].getText()).toEqual("Clear list");
      expect(todos[0].getId()).toBeDefined();
      expect(todos[1].getText()).toEqual("Go home");
      expect(todos[1].getId()).toBeDefined();
      expect(todos[2].getText()).toEqual(todoText);
      expect(todos[2].getId()).toBeDefined();
    });
  });
});
