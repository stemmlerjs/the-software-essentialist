import { Config } from "../../shared/config";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { TransactionalEmailAPISpy } from "./adapters/transactionalEmailAPI/transactionalEmailAPISpy";
import { TransactionalEmailAPI } from "./ports/transactionalEmailAPI";

export class NotificationsModule extends ApplicationModule {
  private transactionalEmailAPI: TransactionalEmailAPI;

  private constructor(config: Config) {
    super(config);
    this.transactionalEmailAPI = this.createTransactionalEmailAPI();
  }

  static build(config: Config) {
    return new NotificationsModule(config);
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
