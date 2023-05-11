import { Student } from "../core/student";
import { DomainEvent } from "../../core/domain-event";

export class FirstNameUpdated implements DomainEvent {
  public readonly name = "FirstNameUpdated";
  public readonly timestamp: Date;

  constructor(
    public readonly student: Student,
    public readonly oldFirstName: string,
    public readonly newFirstName: string
  ) {
    this.timestamp = new Date();
  }
}
