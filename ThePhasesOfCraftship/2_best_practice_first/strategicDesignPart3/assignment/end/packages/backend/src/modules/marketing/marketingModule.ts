import { ContactListAPI } from "./contactListAPI";
import { MarketingController } from "./marketingController";
import { marketingErrorHandler } from "./marketingErrors";
import { MarketingService } from "./marketingService";

export class MarketingModule {
    private marketingService: MarketingService
    private marketingController: MarketingController

    private constructor(private contactListAPI: ContactListAPI) {
        this.marketingService = this.createMarketingService();
        this.marketingController = this.createMarketingController();
    }

    static build(contactListAPI: ContactListAPI) {
        return new MarketingModule(contactListAPI);
    }

    private createMarketingService() {
        return new MarketingService(this.contactListAPI);
    }

    private createMarketingController() {
        return new MarketingController(this.marketingService, marketingErrorHandler);
    }

    public getMarketingController() {
        return this.marketingController;
    }
}