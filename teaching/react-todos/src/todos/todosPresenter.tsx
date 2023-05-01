import { Gateway } from "../shared/gateway";

export class TodosPresenter {
  constructor (gateway: Gateway) {

  }

  getAllTodos () {
    return [{ text: 'lets do something', id: 1 }]
  }
}