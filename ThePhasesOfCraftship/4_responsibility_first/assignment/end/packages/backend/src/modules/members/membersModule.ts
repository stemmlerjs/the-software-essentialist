
import { Config } from "../../shared/config";
import { Database } from "../../shared/database";
import { WebServer } from "../../shared/http";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { UserIdentityService } from "../users/application/userIdentityService";
import { MemberService } from "./application/membersService";
import { membersErrorHandler } from "./memberErrors";
import { MembersController } from "./membersController";
import { ProductionMembersRepository } from "./repos/adapters/productionMembersRepository";
import { MembersRepository } from "./repos/ports/membersRepository";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";

export class MembersModule extends ApplicationModule {
  private membersRepository: MembersRepository;
  private memberService: MemberService
  private membersController: MembersController;

  private constructor(
    db: Database,
    private eventOutbox: EventOutboxTable,
    private usersService: UserIdentityService,
    config: Config,
  ) {
    super(config);
    // Create the tree in reverse (repos, services, controllers)
    this.membersRepository = this.createMembersRepository(db);
    this.memberService = this.createMembersService();
    this.membersController = this.createMembersController(config);
  }

  createMembersController (config: Config) {
    return new MembersController(this.memberService,  membersErrorHandler, config);
  }

  createMembersService () {
    return new MemberService(this.membersRepository, this.usersService);
  }

  getMemberRepository () {
    return this.membersRepository;
  }
  
  createMembersRepository (db: Database) {
    return new ProductionMembersRepository(db.getConnection(), this.eventOutbox)
  }

  getMembersRepository () {
    return this.membersRepository;
  }

  public mountRouter(webServer: WebServer) {
    webServer.mountRouter("/members", this.membersController.getRouter());
  }
  
  public static build(db: Database, eventOutbox: EventOutboxTable, usersService: UserIdentityService, config: Config) {
    return new MembersModule(db, eventOutbox, usersService, config);
  }
}
