
import { Spy } from "../../../../shared/testDoubles/spy";
import {
  SendMailInput,
  TransactionalEmailAPI,
} from "../../ports/transactionalEmailAPI";

export class TransactionalEmailAPISpy
  extends Spy<TransactionalEmailAPI>
  implements TransactionalEmailAPI
{
  constructor() {
    super();
  }

  async sendMail(input: SendMailInput): Promise<boolean> {
    this.addCall("sendMail", [input]);
    return true;
  }
}