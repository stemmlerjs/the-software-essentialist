import { ServerErrorException } from "../../shared/exceptions";
import { ContactListAPI } from "./ports/contactListAPI";

export class MarketingService {
  constructor(private contactListAPI: ContactListAPI) {}

  async addEmailToList(email: string) {
    try {
      const result = await this.contactListAPI.addEmailToList(email);
      return result;
    } catch (err) {
      throw new ServerErrorException();
    }
  }
}
