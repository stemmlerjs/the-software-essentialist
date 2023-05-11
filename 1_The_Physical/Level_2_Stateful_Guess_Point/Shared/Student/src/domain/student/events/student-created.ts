import { DomainEvent } from "../../core/domain-event";
import { Student } from "../core/student";

export class StudentCreated implements DomainEvent {
  public readonly name = "StudentCreated";
  public readonly timestamp: Date;

  constructor(public readonly student: Student) {
    this.timestamp = new Date();
  }
}
