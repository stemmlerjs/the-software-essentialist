
import { ContactListAPI } from "./ports/contactListAPI";

export class MarketingService {
  constructor (private contactListAPI: ContactListAPI) {

  }

  async addEmailToList (email: string): Promise<any> {
    try {
      const result = await this.contactListAPI.addEmailToList(email);
      return { error: undefined, data: undefined, success: result };
    } catch (err) {
      return { error: undefined, data: undefined, success: false }
    }
  }
}