import { ValueObject } from "../../core/value-object";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(value: string): Email {
    return new Email({ value });
  }

  public get value(): string {
    return this.props.value;
  }
}
