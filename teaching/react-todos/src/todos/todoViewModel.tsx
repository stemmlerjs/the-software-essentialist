import { TextUtils } from "../shared/utils/TextUtils";
import { TodoDTO } from "./todoDTO";

export class TodoViewModel {
  constructor (private todoDTO: TodoDTO) {
    
  }

  getId () {
    return this.todoDTO.id
  }

  getText () {
    return this.todoDTO.text
  }

  getTextCapitalized () {
    return TextUtils.capitalize(this.todoDTO.text);
  }
}