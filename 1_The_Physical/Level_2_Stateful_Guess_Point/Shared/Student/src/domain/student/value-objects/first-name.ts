import { ValueObject } from "../../core/value-object";

interface FirstNameProps {
  value: string;
}

export class FirstName extends ValueObject<FirstNameProps> {
  private constructor(props: FirstNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): FirstName {
    return new FirstName({ value });
  }
}
