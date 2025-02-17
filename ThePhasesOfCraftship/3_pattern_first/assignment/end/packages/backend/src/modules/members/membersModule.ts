
import { Config } from "../../shared/config";
import { Database } from "../../shared/database";
import { EventBus } from "../../shared/eventBus/ports/eventBus";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { VoteRepository } from "../comments/repos/ports/voteRepository";
import { MemberService } from "./application/membersService";
import { MemberSubscriptions } from "./application/memberSubscriptions";
import { ProductionMembersRepository } from "./repos/adapters/productionMembersRepository";
import { MembersRepository } from "./repos/ports/membersRepository";

export class MembersModule extends ApplicationModule {
  private membersRepository: MembersRepository;
  private memberSubscriptions: MemberSubscriptions;
  private memberService: MemberService

  private constructor(
    private db: Database,
    private eventBus: EventBus,
    private votesRepo: VoteRepository,
    config: Config,
  ) {
    super(config);
    this.membersRepository = this.createMembersRepository();
    this.memberService = this.createMembersService(votesRepo);
    this.memberSubscriptions = this.createSubscripions();
  }

  createMembersService (votesRepo: VoteRepository) {
    return new MemberService(this.membersRepository, votesRepo, this.eventBus);
  }

  createSubscripions () {
    return new MemberSubscriptions(this.eventBus, this.memberService);
  }

  createMembersRepository () {
    return new ProductionMembersRepository(this.db.getConnection())
  }

  getMembersRepository () {
    return this.membersRepository;
  }

  public static build(db: Database, eventBus: EventBus, votesRepo: VoteRepository, config: Config) {
    return new MembersModule(db, eventBus, votesRepo, config);
  }
}
