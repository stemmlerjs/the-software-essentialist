
import { Config } from "../../shared/config";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { Database } from "../../shared/database";
import { VoteRepository } from "../comments/repos/ports/commentVoteRepository";
import { ProductionVotesRepository } from "../comments/repos/adapters/productionCommentVotesRepository";

export class VotesModule extends ApplicationModule {
  private votesRepository: VoteRepository;

  private constructor(
    private db: Database,
    config: Config,
  ) {
    super(config);
    this.votesRepository = this.createVotesRepository();
  }

  static build(db: Database, config: Config) {
    return new VotesModule(db, config);
  }

  private createVotesRepository() {
    if (this.votesRepository) return this.votesRepository;

    return new ProductionVotesRepository(this.db.getConnection());
  }

  public getVotesRepository() {
    return this.votesRepository;
  }
}
