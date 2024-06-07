
import { Spy } from "../../../../shared/testDoubles/spy";
import { ContactListAPI } from "../../ports/contactListAPI";

export class ContactListAPISpy
  extends Spy<ContactListAPI>
  implements ContactListAPI
{
  constructor () {
    super();
  }

  public async addEmailToList(email: string): Promise<boolean> {
    console.log(`ContactListAPISpy: Adding ${email} to list... this is for testing & development purposes.`)
    this.addCall('addEmailToList', [email]);
    return true;
  }
}
