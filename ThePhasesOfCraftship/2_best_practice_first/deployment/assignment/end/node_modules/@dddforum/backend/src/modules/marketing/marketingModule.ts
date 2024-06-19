import { Config } from "../../shared/config";
import { WebServer } from "../../shared/http/webServer";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { ContactListAPISpy } from "./adapters/contactListAPI/contactListSpy";
import { MailchimpContactList } from "./adapters/contactListAPI/mailChimpContactList";
import { MarketingController } from "./marketingController";
import { marketingErrorHandler } from "./marketingErrors";
import { MarketingService } from "./marketingService";
import { ContactListAPI } from "./ports/contactListAPI";

export class MarketingModule extends ApplicationModule {
  private marketingService: MarketingService;
  private marketingController: MarketingController;
  private contactListAPI: ContactListAPI;

  private constructor(config: Config) {
    super(config);
    this.contactListAPI = this.buildContactListAPI();
    this.marketingService = this.createMarketingService();
    this.marketingController = this.createMarketingController();
  }

  static build(config: Config) {
    return new MarketingModule(config);
  }

  private createMarketingService() {
    return new MarketingService(this.contactListAPI);
  }

  private createMarketingController() {
    return new MarketingController(
      this.marketingService,
      marketingErrorHandler,
    );
  }

  private buildContactListAPI() {
    if (this.getEnvironment() === "production") {
      return new MailchimpContactList();
    }

    return new ContactListAPISpy();
  }

  public getMarketingController() {
    return this.marketingController;
  }

  public mountRouter(webServer: WebServer) {
    webServer.mountRouter("/marketing", this.marketingController.getRouter());
  }

  public getMarketingService() {
    return this.marketingService;
  }

  public getContactListAPI() {
    return this.contactListAPI;
  }
}
