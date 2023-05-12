
type UnvalidatedTodo = { text: string }

interface ValidTodoProps {
  text: string;
}

export class Todo {
  private props: ValidTodoProps;

  private constructor (props: ValidTodoProps) {
    this.props = props;
  }

  public static create (input: UnvalidatedTodo): Todo | 'Failure' {
    // Validate todo
    return new Todo({  text: input.text });
  }

  getText () {
    return this.props.text
  }
}