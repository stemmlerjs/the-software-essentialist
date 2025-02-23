
import { Config } from "../../shared/config";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { Database } from "../../shared/database";
import { VoteRepository } from "./repos/ports/voteRepository";
import { VotesService } from "./application/votesService";
import { ProductionVotesRepository } from "./repos/adapters/productionVotesRepo";
import { MembersRepository } from "../members/repos/ports/membersRepository";
import { CommentRepository } from "../comments/repos/ports/commentRepository";
import { PostsRepository } from "../posts/repos/ports/postsRepository";
import { EventBus } from "../../shared/eventBus/ports/eventBus";
import { VotesSubscriptions } from "./application/votesSubscriptions";

export class VotesModule extends ApplicationModule {
  private votesRepository: VoteRepository;
  private votesService: VotesService;
  private votesSubscriptions: VotesSubscriptions;

  private constructor(
    private db: Database,
    private membersRepository: MembersRepository,
    private commentRepository: CommentRepository,
    private postsRepository: PostsRepository,
    private eventBus: EventBus,
    config: Config,
  ) {
    super(config);
    this.votesRepository = this.createVotesRepository();
    this.votesService = this.createVotesService();
    this.votesSubscriptions = this.createVotesSubscriptions();
  }

  static build(db: Database, membersRepo: MembersRepository, commentsRepo: CommentRepository, postsRepo: PostsRepository, eventBus: EventBus, config: Config) {
    return new VotesModule(db, membersRepo, commentsRepo, postsRepo, eventBus, config);
  }
  
  private createVotesService () {
    return new VotesService(this.membersRepository, this.commentRepository, this.postsRepository, this.votesRepository, this.eventBus);
  }

  private createVotesSubscriptions () {
    return new VotesSubscriptions(this.eventBus, this.votesService);
  }

  private createVotesRepository() {
    if (this.votesRepository) return this.votesRepository;

    return new ProductionVotesRepository(this.db.getConnection());
  }

  public getVotesRepository() {
    return this.votesRepository;
  }

  public getVotesService () {
    return this.votesService
  }
}
