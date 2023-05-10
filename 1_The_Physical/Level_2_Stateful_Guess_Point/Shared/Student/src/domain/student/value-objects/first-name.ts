import { Result } from "../../../shared/result";
import { ValueObject } from "../../core/value-object";

interface FirstNameProps {
  value: string;
}

export interface FirstNameValidationError {
  min?: string;
  max?: string;
  letters?: string;
  required?: string;
}

export class FirstName extends ValueObject<FirstNameProps> {
  static readonly minLength = 2;
  static readonly maxLength = 10;

  private constructor(props: FirstNameProps) {
    super(props);
  }

  public static create(
    value: string
  ): Result<FirstName, FirstNameValidationError> {
    const errors = FirstName.validate(value);

    if (
      Object.values(errors).some((props) => Object.values(props).some(Boolean))
    ) {
      return Result.failure(errors);
    }

    return Result.success(new FirstName({ value }));
  }

  public static validate(value: string): FirstNameValidationError {
    const errors: FirstNameValidationError = {};

    if (!value) {
      errors.required = "Firstname is required";
    } else {
      value = value.trim();

      if (value.length < FirstName.minLength) {
        errors.min = `Firstname must be at least ${FirstName.minLength} characters long`;
      }

      if (value.length > FirstName.maxLength) {
        errors.max = `Firstname must be at most ${FirstName.maxLength} characters long`;
      }

      if (!/^[a-zA-Z]+$/.test(value)) {
        errors.letters = `Firstname must contain only letters`;
      }
    }

    return errors;
  }

  public get value(): string {
    return this.props.value;
  }
}
