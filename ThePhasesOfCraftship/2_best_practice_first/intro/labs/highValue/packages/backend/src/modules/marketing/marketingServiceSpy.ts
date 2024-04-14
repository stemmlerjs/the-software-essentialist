
import { Spy } from "@dddforum/shared/tests/support/testDoubles/spy";
import { MarketingService } from "./marketingService";

export class MarketingServiceSpy
  extends Spy<MarketingServiceSpy>
  implements MarketingService
{
  constructor () {
    super();
  }

  public async addEmailToList(email: string): Promise<boolean> {
    console.log(`MarketingServiceSpy: Adding ${email} to list... this is for testing & development purposes.`)
    this.addCall('addEmailToList', [email]);
    return true;
  }
}
