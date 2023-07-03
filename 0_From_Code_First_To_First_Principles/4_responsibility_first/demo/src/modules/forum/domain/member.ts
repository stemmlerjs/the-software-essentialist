import { AggregateRoot } from "../../../shared/domain/aggregateRoot";

interface MemberInput {
  id: string;
  userId: string;
}

export class Member extends AggregateRoot {
  
}