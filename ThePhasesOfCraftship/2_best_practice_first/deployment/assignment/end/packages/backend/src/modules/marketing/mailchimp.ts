
import { MarketingService } from "./marketingService";

export class Mailchimp implements MarketingService {
  async addEmailToList(email: string): Promise<boolean> {
    // Do the actual work
    console.log(`Mailchimp: Adding ${email} list... for production usage.`)
    return true;
  }
}