import { Result } from "../../../shared/result";
import { ValueObject } from "../../core/value-object";

interface LastNameProps {
  value: string;
}

export interface LastNameValidationError {
  min?: string;
  max?: string;
  letters?: string;
  required?: string;
}

export class LastName extends ValueObject<LastNameProps> {
  static readonly minLength = 2;
  static readonly maxLength = 15;

  private constructor(props: LastNameProps) {
    super(props);
  }

  public static create(
    value: string
  ): Result<LastName, LastNameValidationError> {
    const errors = LastName.validate(value);

    if (
      Object.values(errors).some((props) => Object.values(props).some(Boolean))
    ) {
      return Result.failure(errors);
    }

    return Result.success(new LastName({ value }));
  }

  public static validate(value: string): LastNameValidationError {
    const errors: LastNameValidationError = {};

    if (!value) {
      errors.required = "Lastname is required";
    } else {
      value = value.trim();

      if (value.length < LastName.minLength) {
        errors.min = `Lastname must be at least ${LastName.minLength} characters long`;
      }

      if (value.length > LastName.maxLength) {
        errors.max = `Lastname must be at most ${LastName.maxLength} characters long`;
      }

      if (!/^[a-zA-Z]+$/.test(value)) {
        errors.letters = `Lastname must contain only letters`;
      }
    }

    return errors;
  }

  public get value(): string {
    return this.props.value;
  }
}
