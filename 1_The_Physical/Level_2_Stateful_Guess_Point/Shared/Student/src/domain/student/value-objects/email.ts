import { Result } from "../../../shared/result";
import { ValueObject } from "../../core/value-object";

interface EmailProps {
  value: string;
}

export interface EmailValidationError {
  required?: string;
  domain?: string;
}

export class Email extends ValueObject<EmailProps> {
  public static readonly domain = "essentialist.dev";

  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(value: string): Result<Email, EmailValidationError> {
    const error = Email.validate(value);

    if (
      Object.values(error).some((props) => Object.values(props).some(Boolean))
    ) {
      return Result.failure(error);
    }

    return Result.success(new Email({ value }));
  }

  public static validate(value: string): EmailValidationError {
    const error: EmailValidationError = {};

    if (!value) {
      error.required = "Email is required";
    } else {
      value = value.toLowerCase().trim();

      const domain = value.split("@")[1];
      if (domain !== Email.domain) {
        error.domain = `Email must be from '${Email.domain}' domain`;
      }
    }

    return error;
  }

  public get value(): string {
    return this.props.value;
  }
}
