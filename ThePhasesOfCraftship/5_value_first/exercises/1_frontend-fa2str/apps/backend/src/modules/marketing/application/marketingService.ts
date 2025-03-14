import { ServerErrors } from "@dddforum/errors/server";
import { ContactListAPI } from "../ports/contactListAPI";

export class MarketingService {
  constructor(private contactListAPI: ContactListAPI) {}

  async addEmailToList(email: string) {
    try {
      const result = await this.contactListAPI.addEmailToList(email);
      return result;
    } catch (err) {
      throw new ServerErrors.GenericServerError();
    }
  }
}
