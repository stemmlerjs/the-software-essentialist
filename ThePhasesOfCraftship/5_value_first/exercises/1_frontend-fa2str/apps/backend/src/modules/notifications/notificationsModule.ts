
import { EventBus } from "@dddforum/bus";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { NotificationsService } from "./application/notificationsService";
import { NotificationsSubscriptions } from "./application/notificationSubscriptions";
import { TransactionalEmailAPISpy } from "./externalServices/adapters/transactionalEmailAPI/transactionalEmailAPISpy";
import { TransactionalEmailAPI } from "./externalServices/ports/transactionalEmailAPI";
import { Config } from "@dddforum/config";

export class NotificationsModule extends ApplicationModule {
  private transactionalEmailAPI: TransactionalEmailAPI;
  private notificationsService: NotificationsService;
  private notificationsSubscriptions: NotificationsSubscriptions;

  private constructor(
    private eventBus: EventBus,
    config: Config
  ) {
    super(config);
    this.transactionalEmailAPI = this.createTransactionalEmailAPI();
    this.notificationsService = this.createNotificationsService()
    this.notificationsSubscriptions = this.createNotificationSubscriptions();
  }

  static build(eventBus: EventBus, config: Config) {
    return new NotificationsModule(eventBus, config);
  }

  private createNotificationSubscriptions () {
    return new NotificationsSubscriptions(this.eventBus, this.notificationsService);
  }

  private createNotificationsService () {
    return new NotificationsService(this.transactionalEmailAPI);
  }

  public getNotificationsService () {
    return this.notificationsService;
  }

  public getTransactionalEmailAPI() {
    return this.transactionalEmailAPI;
  }

  private createTransactionalEmailAPI() {
    if (this.getEnvironment() === "production") {
      return new TransactionalEmailAPISpy();
    }

    /**
     * For 'testing' and 'staging', if we wanted to use a different one
     */

    // When we execute unit tests, we use this.
    return new TransactionalEmailAPISpy();
  }
}
