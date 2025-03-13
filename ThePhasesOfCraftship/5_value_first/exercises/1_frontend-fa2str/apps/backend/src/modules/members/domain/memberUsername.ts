
import { ApplicationErrors } from "@dddforum/errors/application";
import { ValueObject } from '@dddforum/core'
import { z } from "zod";

const memberUsernameSchema = z.string().min(5).max(20);

interface MemberUsernameProps {
  value: string;
}

export class MemberUsername extends ValueObject<MemberUsernameProps> {
  private constructor (props: MemberUsernameProps) {
    super(props);
  }

  get value () {
    return this.props.value
  }

  public static toDomain (value: string): MemberUsername {
    return new MemberUsername({ value });
  }

  public static create (input: string | undefined): MemberUsername | ApplicationErrors.ValidationError {

    /**
     * Handle validation rules here. There are many possibilities for types of validation rules
     * we could use here.
     */

    const result = memberUsernameSchema.safeParse(input);

    if (result.success) {
      return new MemberUsername({ value: input as string });
    }

    return new ApplicationErrors.ValidationError(`Member username invalid`);
  }
}
