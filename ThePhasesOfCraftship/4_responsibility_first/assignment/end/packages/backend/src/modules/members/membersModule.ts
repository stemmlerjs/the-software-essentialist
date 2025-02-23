
import { Config } from "../../shared/config";
import { Database } from "../../shared/database";
import { EventBus } from "../../shared/events/ports/eventBus";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { MemberService } from "./application/membersService";
import { ProductionMembersRepository } from "./repos/adapters/productionMembersRepository";
import { MembersRepository } from "./repos/ports/membersRepository";

export class MembersModule extends ApplicationModule {
  private membersRepository: MembersRepository;
  private memberService: MemberService

  private constructor(
    private db: Database,
    private eventBus: EventBus,
    config: Config,
  ) {
    super(config);
    this.membersRepository = this.createMembersRepository();
    this.memberService = this.createMembersService();
  }

  createMembersService () {
    return new MemberService(this.membersRepository, this.eventBus);
  }
  
  createMembersRepository () {
    return new ProductionMembersRepository(this.db.getConnection())
  }

  getMembersRepository () {
    return this.membersRepository;
  }

  public static build(db: Database, eventBus: EventBus, config: Config) {
    return new MembersModule(db, eventBus, config);
  }
}
