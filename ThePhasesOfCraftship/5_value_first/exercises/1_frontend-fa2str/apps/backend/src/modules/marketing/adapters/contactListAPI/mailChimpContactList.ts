import { ContactListAPI } from "../../ports/contactListAPI";

export class MailchimpContactList implements ContactListAPI {
  async addEmailToList(email: string): Promise<boolean> {
    // Do the actual work
    console.log(
      `MailchimpContactList: Adding ${email} list... for production usage.`,
    );
    return true;
  }
}
