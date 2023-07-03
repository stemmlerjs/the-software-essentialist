import { Guard } from "../../utils/guard";
import { Result } from "../../utils/result";

export type SystemRole = 'app' | 'relay' | 'worker' 

export class SystemRoles {
  private values: SystemRole[];

  private constructor (values: SystemRole[]) {
    this.values = values ? values : [];
  }

  public static create (values: string[]) {
    let guardResult = Guard.thatEachIsOneOf(values, ['app', 'relay', 'worker']);

    if (!guardResult.isSuccess()) {
      return Result.fail(guardResult.getError())
    }

    let systemRoles = new SystemRoles(values as SystemRole[]);

    return Result.ok<SystemRoles>(systemRoles);
  }

  public contains (role: SystemRole): boolean {
    return this.values.findIndex(r => r === role) !== -1;
  }

  public getLength() {
    return this.values.length;
  }
}