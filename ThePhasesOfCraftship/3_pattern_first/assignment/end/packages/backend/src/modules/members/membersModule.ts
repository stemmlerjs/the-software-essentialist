
import { Config } from "../../shared/config";
import { Database } from "../../shared/database";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { ProductionMembersRepository } from "./repos/adapters/productionMembersRepository";
import { MembersRepository } from "./repos/ports/membersRepository";


export class MembersModule extends ApplicationModule {
  private membersRepository: MembersRepository;

  private constructor(
    private db: Database,
    config: Config,
  ) {
    super(config);
    this.membersRepository = this.createMembersRepository();
  }

  createMembersRepository () {
    return new ProductionMembersRepository(this.db.getConnection())
  }

  getMembersRepository () {
    return this.membersRepository;
  }

  public static build(db: Database, config: Config) {
    return new MembersModule(db, config);
  }
}
