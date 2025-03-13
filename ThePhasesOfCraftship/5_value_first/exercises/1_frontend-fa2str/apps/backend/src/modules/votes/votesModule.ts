
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { VoteRepository } from "./repos/ports/voteRepository";
import { VotesService } from "./application/votesService";
import { ProductionVotesRepository } from "./repos/adapters/productionVotesRepo";
import { MembersRepository } from "../members/repos/ports/membersRepository";
import { CommentRepository } from "../comments/repos/ports/commentRepository";
import { PostsRepository } from "../posts/repos/ports/postsRepository";
import { VotesSubscriptions } from "./application/votesSubscriptions";
import { EventBus } from "@dddforum/bus";
import { EventOutboxTable } from "@dddforum/outbox";
import { VotesController } from "./votesController";
import { votesErrorHandler } from "./votesErrors";
import { WebServer } from "../../shared/http";
import { Database } from "@dddforum/database";
import { Config } from "@dddforum/config";

export class VotesModule extends ApplicationModule {
  private votesRepository: VoteRepository;
  private votesService: VotesService;
  private votesSubscriptions: VotesSubscriptions;
  private votesController: VotesController;

  private constructor(
    private db: Database,
    private membersRepository: MembersRepository,
    private commentRepository: CommentRepository,
    private postsRepository: PostsRepository,
    private eventBus: EventBus,
    private eventsTable: EventOutboxTable,
    config: Config,
  ) {
    super(config);
    this.votesRepository = this.createVotesRepository();
    this.votesService = this.createVotesService();
    this.votesSubscriptions = this.createVotesSubscriptions();
    this.votesController = this.createVotesController();
  }

  static build(db: Database, membersRepo: MembersRepository, commentsRepo: CommentRepository, postsRepo: PostsRepository, eventBus: EventBus, eventsTable: EventOutboxTable, config: Config) {
    return new VotesModule(db, membersRepo, commentsRepo, postsRepo, eventBus, eventsTable, config);
  }
  
  private createVotesService () {
    return new VotesService(this.membersRepository, this.commentRepository, this.postsRepository, this.votesRepository);
  }

  private createVotesSubscriptions () {
    return new VotesSubscriptions(this.eventBus, this.votesService);
  }

  private createVotesRepository() {
    if (this.votesRepository) return this.votesRepository;

    return new ProductionVotesRepository(this.db,this.eventsTable);
  }

  public getVotesRepository() {
    return this.votesRepository;
  }

  public getVotesService () {
    return this.votesService
  }

  private createVotesController() {
    return new VotesController(this.votesService, votesErrorHandler);
  }

  public mountRouter(webServer: WebServer) {
    webServer.mountRouter("/votes", this.votesController.getRouter());
  }
}
