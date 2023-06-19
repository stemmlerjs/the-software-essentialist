

import { MissingValueError } from "../errors/missingValueError";
import { ValidationError } from "../errors/validationError";
import { Either, Result } from "./result";

export class Guard {
  public static againstValidationErrors(
    items: ValidationError[] | Object[],
  ) : Either<unknown, ValidationError[]> {
    let listOfValidationErrors: ValidationError[] = [];

    items.forEach((item) => {
      if (item instanceof ValidationError) {
        listOfValidationErrors.push(item);
      }
    });

    return listOfValidationErrors.length === 0
      ? Result.ok()
      : Result.fail<ValidationError[]>(listOfValidationErrors)
  }

  public static againstNullOrUndefinedValues(
    data: any,
    values: string[],
  ) : Either<unknown, MissingValueError[]> {
    let missingValueErrors: MissingValueError[] = [];

    let dataKeys = Object.keys(data);

    values.forEach((value) => {
      let keyNotFound = !dataKeys.find((d) => d === value);
      if (keyNotFound) {
        missingValueErrors.push(new MissingValueError(value));
        return;
      }
    });

    return missingValueErrors.length === 0
      ? Result.ok()
      : Result.fail<MissingValueError[]>(missingValueErrors);
  }

  public static thatEachIsOneOf(
    inputValues: string[],
    typedValues: string[],
  ) : Either<boolean, MissingValueError[]> {
    let validationErrors: ValidationError[] = [];

    inputValues.forEach((inputValue) => {
      let foundMatchingValue = typedValues.find((t) => t === inputValue);

      if (!foundMatchingValue)
        validationErrors.push(
          new ValidationError(
            `${inputValue} is not a valid one of ${typedValues}`,
          ),
        );
    });

    return validationErrors.length === 0
      ? Result.ok<boolean>(false)
      : Result.fail<ValidationError[]>(validationErrors)
  }
}
