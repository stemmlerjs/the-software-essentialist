
import { Config } from "../../shared/config";
import { Database } from "../../shared/database";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { MemberService } from "./application/membersService";
import { ProductionMembersRepository } from "./repos/adapters/productionMembersRepository";
import { MembersRepository } from "./repos/ports/membersRepository";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";

export class MembersModule extends ApplicationModule {
  private membersRepository: MembersRepository;
  private memberService: MemberService

  private constructor(
    private db: Database,
    private eventOutbox: EventOutboxTable,
    config: Config,
  ) {
    super(config);
    this.membersRepository = this.createMembersRepository();
    this.memberService = this.createMembersService();
  }

  createMembersService () {
    return new MemberService(this.membersRepository);
  }
  
  createMembersRepository () {
    return new ProductionMembersRepository(this.db.getConnection(), this.eventOutbox)
  }

  getMembersRepository () {
    return this.membersRepository;
  }

  public static build(db: Database, eventOutbox: EventOutboxTable, config: Config) {
    return new MembersModule(db, eventOutbox, config);
  }
}
